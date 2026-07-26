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

    // 1. Image Initialization
    const mapImage = new Image();
    mapImage.src = "/assets/gg.png";
    let imageLoaded = false;
    mapImage.onload = () => {
      imageLoaded = true;
    };

    const cities = [
      { name: "Kinshasa", x: 0.52, y: 0.52 },
      { name: "Johannesburg", x: 0.57, y: 0.60 },
      { name: "Cape Town", x: 0.57, y: 0.68 },
    ];

    let paths = [];
    let pulses = [];
    let mapBox = { x: 0, y: 0, w: 0, h: 0 };
    let dotLayer = null;
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
      canvas.height = 560;

      const width = canvas.width;
      const height = canvas.height;

      dotLayer = buildDotLayer(width, height);

      const mapH = height * 0.92;
      const mapW = mapH * 0.75;

      mapBox = {
        x: (width - mapW) / 2,
        y: (height - mapH) / 2,
        w: mapW,
        h: mapH,
      };

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
      if (!imageLoaded && !mapImage.complete) return;

      const centerX = mapBox.x + mapBox.w / 2;
      const centerY = mapBox.y + mapBox.h / 2;

      const breathe = 1 + Math.sin(elapsed / 1400) * 0.015;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(breathe, breathe);
      ctx.translate(-centerX, -centerY);

      ctx.globalAlpha = 1.0;

      ctx.drawImage(mapImage, mapBox.x, mapBox.y, mapBox.w, mapBox.h);

      ctx.restore();
    }

    // 2. Updated drawCities function with enhanced dot visibility
    function drawCities(elapsed) {
      cities.forEach((city, i) => {
        const cx = mapBox.x + city.x * mapBox.w;
        const cy = mapBox.y + city.y * mapBox.h;
        const color = [colors.teal, colors.orange, colors.yellow][i % 3];

        const distToMouse =
          mouse.x === null ? Infinity : Math.hypot(mouse.x - cx, mouse.y - cy);
        const isNear = distToMouse < 50;
        const pulseScale = (1 + Math.sin(elapsed / 700 + i) * 0.25) * (isNear ? 1.6 : 1);

        // A. Outer glowing pulse ring (increased opacity for visibility)
        ctx.beginPath();
        ctx.arc(cx, cy, 11 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? `${color}66` : `${color}33`;
        ctx.fill();

        // B. White contrast ring around the dot
        const dotRadius = isNear ? 7 : 5.5;
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // C. Inner solid colored dot with glow shadow
        ctx.beginPath();
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isNear ? 16 : 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Clear shadow for text rendering

        // D. High-contrast text label setup
        ctx.font = isNear ? "bold 14px sans-serif" : "bold 13px sans-serif";
        ctx.textBaseline = "middle";

        const labelX = cx + 14;
        const labelY = cy;

        // White background stroke for text
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.lineJoin = "round";
        ctx.strokeText(city.name, labelX, labelY);

        // Dark text fill
        ctx.fillStyle = "#0f172a";
        ctx.fillText(city.name, labelX, labelY);
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

      ctx.globalAlpha = 0.65;
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