import { useEffect, useRef } from 'react';

interface Props {
  starColor?: string;
  starCount?: number;
  speed?: number;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

export function StarsBackground({
  starColor = '#FFF7EC',
  starCount = 180,
  speed = 1,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let stars: Star[] = [];
    // Mouse offset for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function makeStars(w: number, h: number): Star[] {
      return Array.from({ length: starCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        // Mix of slow and slightly faster stars for depth
        const vel = (Math.random() * 0.25 + 0.04) * speed;
        const isBig = Math.random() < 0.12;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: isBig ? Math.random() * 1.3 + 0.8 : Math.random() * 0.55 + 0.15,
          opacity: 0,
          baseOpacity: Math.random() * 0.45 + 0.15,
          twinkleSpeed: Math.random() * 0.0006 + 0.0002,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
        };
      });
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      stars = makeStars(canvas!.width, canvas!.height);
    }

    let lastT = 0;
    function draw(t: number) {
      const dt = Math.min(t - lastT, 50); // cap dt to avoid jump on tab-switch
      lastT = t;

      // Lerp mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = starColor;

      const w = canvas!.width;
      const h = canvas!.height;

      for (const s of stars) {
        // Drift position
        s.x += s.vx * (dt / 16);
        s.y += s.vy * (dt / 16);

        // Wrap around edges
        if (s.x < -2) s.x += w + 2;
        else if (s.x > w + 2) s.x -= w + 2;
        if (s.y < -2) s.y += h + 2;
        else if (s.y > h + 2) s.y -= h + 2;

        // Twinkle
        const twinkle = (Math.sin(t * s.twinkleSpeed + s.twinklePhase) + 1) * 0.5;
        ctx!.globalAlpha = s.baseOpacity * (0.25 + twinkle * 0.75);

        // Subtle parallax offset based on star size (bigger = more displacement)
        const px = s.x + mouseX * s.r * 0.6;
        const py = s.y + mouseY * s.r * 0.6;

        ctx!.beginPath();
        ctx!.arc(px, py, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetMouseX = (e.clientX - cx) / (rect.width / 2);
      targetMouseY = (e.clientY - cy) / (rect.height / 2);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    raf = requestAnimationFrame(draw);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [starColor, starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
    />
  );
}
