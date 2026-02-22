/**
 * Shared atmosphere stars for non-home pages.
 * Adds the same twinkling star canvas style used on home without layout side effects.
 */
(function () {
  "use strict";

  if (document.querySelector('[data-km-atmosphere="stars"]')) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("data-km-atmosphere", "stars");
  canvas.style.cssText =
    "position:fixed;inset:0;z-index:0;pointer-events:none;width:100%;height:100%";

  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  setCanvasSize();
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.3,
    a: Math.random(),
    spd: Math.random() * 0.006 + 0.002,
    dir: Math.random() > 0.5 ? 1 : -1
  }));

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.a += star.spd * star.dir;
      if (star.a >= 0.9 || star.a <= 0.05) star.dir *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  draw();
  window.addEventListener("resize", setCanvasSize);
})();
