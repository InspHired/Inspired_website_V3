import { useEffect, useRef } from "react";

function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const colors = {
      teal: "#509b9e",
      orange: "#d96b43",
      yellow: "#e4af51",
      navy: "#1f3540",
      border: "#e5dfd5",
    };

    // Simplified, stylized silhouette of the African continent (normalized 0-1 coords).
    // Not geographically precise — decorative, to ground the network as an African talent map.
    const africaOutline = [
      [0.55, 0.02], [0.62, 0.1], [0.68, 0.18], [0.78, 0.3],
      [0.95, 0.34], [0.85, 0.38], [0.68, 0.55], [0.62, 0.72],
      [0.55, 0.88], [0.4, 0.95], [0.33, 0.75], [0.3, 0.62],
      [0.18, 0.42], [0.05, 0.28], [0.28, 0.06], [0.55, 0.02],
    ];

    const cities = [
      { name: "Kinshasa", x: 0.42, y: 0.58 },
      { name: "Johannesburg", x: 0.48, y: 0.82 },
      { name: "Cape Town", x: 0.4, y: 0.93 },
    ];

    let paths = [];
    let pulses = [];
    let mapBox = { x: 0, y: 0, w: 0, h: 0 };
    let mapPoints = [];
    let dotLayer = null; // cached static dot-grid only
    let animationFrame;
    let startTime = performance.now();
    const mouse = { x: null, y: null, radius: 140 };

    function getPointOnPath(path, progress) {
      const points = path.points;
      const totalSegments = points.length - 1;
      const exactProgress = progress * totalSegments;
      let segmentIndex = Math.floor(exactProgress);
      if (segmentIndex >= totalSegments) segmentIndex = totalSegments - 1;
      const segmentProgress = exactProgress - segmentIndex;
      const start = points[segmentIndex];
      const end = points[segmentIndex + 1];
      return {
        x: start.x + (end.x - start.x) * segmentProgress,
        y: start.y + (end.y - start.y) * segmentProgress,
      };
    }

    function drawSmoothPath(context, points, close) {
      context.beginPath();
      context.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i][0] + points[i + 1][0]) / 2;
        const midY = (points[i][1] + points[i + 1][1]) / 2;
        context.quadraticCurveTo(points[i][0], points[i][1], midX, midY);
      }
      const last = points[points.length - 1];
      context.lineTo(last[0], last[1]);
      if (close) context.closePath();
    }

    function buildDotLayer(width, height) {
      const layer = document.createElement("canvas");
      layer.width = width;
      layer.height = height;
      const lctx = layer.getContext("2d");

      const gap = 28;
      lctx.fillStyle = "rgba(31, 53, 64, 0.05)";
      for (let gx = gap / 2; gx < width; gx += gap) {
        for (let gy = gap / 2; gy < height; gy += gap) {
          lctx.beginPath();
          lctx.arc(gx, gy, 1.1, 0, Math.PI * 2);
          lctx.fill();
        }
      }
      return layer;
    }

    function initNetwork() {
      canvas.width = window.innerWidth;
      canvas.height = 480;

      const width = canvas.width;
      const height = canvas.height;

      dotLayer = buildDotLayer(width, height);

      // Smaller footprint: was 0.88 of height, now ~0.6
      const mapH = height * 0.6;
      const mapW = mapH * 0.72;
      mapBox = {
        x: (width - mapW) / 2,
        y: (height - mapH) / 2 + 10,
        w: mapW,
        h: mapH,
      };
      mapPoints = africaOutline.map(([nx, ny]) => [
        mapBox.x + nx * mapBox.w,
        mapBox.y + ny * mapBox.h,
      ]);

      paths = [
        {
          points: [
            { x: 0, y: height * 0.45 },
            { x: width * 0.08, y: height * 0.45 },
            { x: width * 0.14, y: height * 0.22 },
            { x: width * 0.35, y: height * 0.22 },
            { x: width * 0.48, y: height * 0.42 },
            { x: width * 0.62, y: height * 0.42 },
            { x: width * 0.72, y: height * 0.2 },
            { x: width, y: height * 0.2 },
          ],
          color: colors.teal,
          width: 3.5,
        },
        {
          points: [
            { x: 0, y: height * 0.25 },
            { x: width * 0.12, y: height * 0.48 },
            { x: width * 0.42, y: height * 0.48 },
            { x: width * 0.54, y: height * 0.26 },
            { x: width * 0.68, y: height * 0.26 },
            { x: width * 0.76, y: height * 0.52 },
            { x: width, y: height * 0.52 },
          ],
          color: colors.orange,
          width: 3.5,
        },
        {
          points: [
            { x: 0, y: height * 0.12 },
            { x: width * 0.18, y: height * 0.12 },
            { x: width * 0.26, y: height * 0.35 },
            { x: width * 0.5, y: height * 0.35 },
            { x: width * 0.6, y: height * 0.62 },
            { x: width * 0.8, y: height * 0.62 },
          ],
          color: colors.yellow,
          width: 2.5,
        },
      ];

      pulses = paths.flatMap((path, pathIndex) =>
        Array.from({ length: 3 }, () => ({
          pathIndex,
          progress: Math.random(),
          speed: 0.001 + Math.random() * 0.0009,
          color: path.color,
        }))
      );
    }

    function drawGlow(x, y, radius, color) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.4);
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.35, color);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(x, y, radius * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function drawContinent(elapsed) {
      // Distance from cursor to map center drives a vibrancy boost.
      const centerX = mapBox.x + mapBox.w / 2;
      const centerY = mapBox.y + mapBox.h / 2;
      const distToCenter =
        mouse.x === null ? Infinity : Math.hypot(mouse.x - centerX, mouse.y - centerY);
      const hoverRange = mapBox.w; // roughly the map's own width as falloff range
      const proximity = Math.max(0, 1 - distToCenter / hoverRange); // 0 (far) -> 1 (at center)

      const breathe = 1 + Math.sin(elapsed / 1400) * 0.015;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(breathe, breathe);
      ctx.translate(-centerX, -centerY);

      drawSmoothPath(ctx, mapPoints, true);

      // Vibrant gradient fill, more saturated the closer the cursor gets.
      const gradient = ctx.createLinearGradient(mapBox.x, mapBox.y, mapBox.x, mapBox.y + mapBox.h);
      const baseAlpha = 0.1 + proximity * 0.16;
      gradient.addColorStop(0, `rgba(80, 155, 158, ${baseAlpha})`);
      gradient.addColorStop(0.5, `rgba(228, 175, 81, ${baseAlpha * 0.9})`);
      gradient.addColorStop(1, `rgba(217, 107, 67, ${baseAlpha})`);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = `rgba(31, 53, 64, ${0.22 + proximity * 0.35})`;
      ctx.lineWidth = 1.5 + proximity * 1;
      ctx.setLineDash(proximity > 0.15 ? [] : [2, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      if (proximity > 0.1) {
        ctx.shadowColor = colors.teal;
        ctx.shadowBlur = 14 * proximity;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    }

    function drawCities(elapsed) {
      cities.forEach((city, i) => {
        const cx = mapBox.x + city.x * mapBox.w;
        const cy = mapBox.y + city.y * mapBox.h;
        const color = [colors.teal, colors.orange, colors.yellow][i % 3];

        const distToMouse =
          mouse.x === null ? Infinity : Math.hypot(mouse.x - cx, mouse.y - cy);
        const isNear = distToMouse < 50;
        const pulseScale = (1 + Math.sin(elapsed / 700 + i) * 0.25) * (isNear ? 1.6 : 1);

        ctx.beginPath();
        ctx.arc(cx, cy, 9 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? `${color}44` : `${color}22`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, isNear ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isNear ? 14 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = isNear ? "600 12px sans-serif" : "500 11px sans-serif";
        ctx.fillStyle = colors.navy;
        ctx.textBaseline = "middle";
        ctx.fillText(city.name, cx + 12, cy);
      });
    }

    function animate(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (dotLayer) ctx.drawImage(dotLayer, 0, 0);

      drawContinent(elapsed);

      paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        path.points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.5;
        ctx.shadowColor = path.color;
        ctx.shadowBlur = 8;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) pulse.progress = 0;

        const position = getPointOnPath(paths[pulse.pathIndex], pulse.progress);
        const distance =
          mouse.x === null ? Infinity : Math.hypot(mouse.x - position.x, mouse.y - position.y);
        const size = distance < mouse.radius ? 6 : 3.5;

        drawGlow(position.x, position.y, size, pulse.color);
      });

      drawCities(elapsed);

      animationFrame = requestAnimationFrame(animate);
    }

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    initNetwork();
    animationFrame = requestAnimationFrame(animate);

    window.addEventListener("resize", initNetwork);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", initNetwork);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas id="networkCanvas" ref={canvasRef}></canvas>;
}

export default NetworkCanvas;