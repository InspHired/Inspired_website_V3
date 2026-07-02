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
    };

    let paths = [];
    let pulses = [];
    let animationFrame;
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

    function initNetwork() {
      canvas.width = window.innerWidth;
      canvas.height = 480;

      const width = canvas.width;
      const height = canvas.height;

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
          width: 4,
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
          width: 4,
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
          width: 3,
        },
      ];

      pulses = paths.flatMap((path, pathIndex) =>
        Array.from({ length: 3 }, () => ({
          pathIndex,
          progress: Math.random(),
          speed: 0.0012 + Math.random() * 0.001,
          color: path.color,
        }))
      );
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      paths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);

        path.points.slice(1).forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });

        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = 0.6;
        ctx.shadowColor = path.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) pulse.progress = 0;

        const position = getPointOnPath(paths[pulse.pathIndex], pulse.progress);

        const distance =
          mouse.x === null
            ? Infinity
            : Math.hypot(mouse.x - position.x, mouse.y - position.y);

        const size = distance < mouse.radius ? 7 : 4;

        ctx.beginPath();
        ctx.arc(position.x, position.y, size, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 16;
        ctx.fill();
      });

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
    animate();

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