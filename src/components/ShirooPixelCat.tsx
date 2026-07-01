"use client";

import React, { useState, useEffect } from "react";

interface ShirooPixelCatProps {
  size?: number;
  className?: string;
  talking?: boolean;
  sad?: boolean;
}

const ShirooPixelCat = React.memo(function ShirooPixelCat({
  size = 128,
  className = "",
  talking = false,
  sad = false,
}: ShirooPixelCatProps) {
  const P = 11; // ukuran 1 pixel
  const O = "#1a1a1a"; // outline
  const W = "#ffffff"; // putih badan
  const I = "#f4a0b0"; // hidung pink
  const IB = "#e07090"; // hidung gelap
  const IR = "#3a3a6a"; // iris mata
  const BL = "#fde0e0"; // pipi blush
  const WS = "#aaaaaa"; // kumis
  const GR = "#e8e8e8"; // garis dahi

  const [mouthOpen, setMouthOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Talking mouth animation loop
  useEffect(() => {
    if (sad || !talking) {
      const t = setTimeout(() => {
        setMouthOpen(false);
      }, 0);
      return () => clearTimeout(t);
    }
    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 150);
    return () => clearInterval(interval);
  }, [talking, sad]);

  // Automatic blinking loop
  useEffect(() => {
    if (sad) {
      const t = setTimeout(() => {
        setIsBlinking(false);
      }, 0);
      return () => clearTimeout(t);
    }
    let timeoutId: NodeJS.Timeout;
    
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleNextBlink();
      }, 150);
    };

    const scheduleNextBlink = () => {
      const delay = 2500 + Math.random() * 3000; // blink every 2.5 to 5.5 seconds
      timeoutId = setTimeout(triggerBlink, delay);
    };

    scheduleNextBlink();

    return () => clearTimeout(timeoutId);
  }, [sad]);

  // helper: render pixel rect
  const px = (
    x: number,
    y: number,
    w: number,
    h: number,
    fill: string,
    rx = 0,
    key?: string
  ) => (
    <rect
      key={key ?? `${x}-${y}-${fill}`}
      x={x * P}
      y={y * P}
      width={w * P}
      height={h * P}
      fill={fill}
      rx={rx}
      style={{ shapeRendering: "crispEdges" }}
    />
  );

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${32 * P} ${28 * P}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      {/* ── TELINGA KIRI ── */}
      {px(2, 0, 3, 1, O)}
      {px(1, 1, 4, 1, O)}
      {px(2, 1, 2, 1, W)}
      {px(2, 2, 4, 1, O)}
      {px(3, 2, 2, 1, W)}
      {px(2, 2, 1, 1, I)} {/* dalam telinga */}

      {/* ── TELINGA KANAN ── */}
      {px(27, 0, 3, 1, O)}
      {px(27, 1, 4, 1, O)}
      {px(28, 1, 2, 1, W)}
      {px(27, 2, 4, 1, O)}
      {px(28, 2, 2, 1, W)}
      {px(29, 2, 1, 1, I)}

      {/* ── TOP KEPALA ── */}
      {px(4, 3, 24, 1, O)}

      {/* ── BADAN KEPALA (row 4–14) ── */}
      {Array.from({ length: 11 }, (_, i) =>
        i === 0 ? (
          <React.Fragment key={i}>
            {px(3, 4 + i, 1, 1, O)}
            {px(4, 4 + i, 24, 1, W)}
            {px(28, 4 + i, 1, 1, O)}
          </React.Fragment>
        ) : (
          <React.Fragment key={i}>
            {px(2, 4 + i, 1, 1, O)}
            {px(3, 4 + i, 26, 1, W)}
            {px(29, 4 + i, 1, 1, O)}
          </React.Fragment>
        )
      )}

      {/* ── MATA KIRI (col 6-9, row 6-9) ── */}
      {sad ? (
        <React.Fragment>
          {px(6, 6, 1, 1, O)}
          {px(9, 6, 1, 1, O)}
          {px(7, 7, 2, 2, O)}
          {px(6, 9, 1, 1, O)}
          {px(9, 9, 1, 1, O)}
          {px(7, 10, 1, 3, "#00e5ff")} {/* air mata neon */}
        </React.Fragment>
      ) : !isBlinking ? (
        <React.Fragment>
          {px(6, 6, 4, 4, O, 4)}
          {px(6.3, 6.3, 3.4, 3.4, IR, 3)}
          {px(7, 7, 2, 2, O, 2)} {/* pupil */}
          {px(7, 7, 0.8, 0.8, W)} {/* highlight */}
        </React.Fragment>
      ) : (
        <path
          d={`M ${6 * P} ${8 * P} Q ${8 * P} ${9.5 * P} ${10 * P} ${8 * P}`}
          fill="none"
          stroke={O}
          strokeWidth={P * 0.4}
          strokeLinecap="round"
        />
      )}

      {/* ── MATA KANAN (col 22-25, row 6-9) ── */}
      {sad ? (
        <React.Fragment>
          {px(22, 6, 1, 1, O)}
          {px(25, 6, 1, 1, O)}
          {px(23, 7, 2, 2, O)}
          {px(22, 9, 1, 1, O)}
          {px(25, 9, 1, 1, O)}
          {px(24, 10, 1, 3, "#00e5ff")}
        </React.Fragment>
      ) : !isBlinking ? (
        <React.Fragment>
          {px(22, 6, 4, 4, O, 4)}
          {px(22.3, 6.3, 3.4, 3.4, IR, 3)}
          {px(23, 7, 2, 2, O, 2)}
          {px(23, 7, 0.8, 0.8, W)}
        </React.Fragment>
      ) : (
        <path
          d={`M ${22 * P} ${8 * P} Q ${24 * P} ${9.5 * P} ${26 * P} ${8 * P}`}
          fill="none"
          stroke={O}
          strokeWidth={P * 0.4}
          strokeLinecap="round"
        />
      )}

      {/* ── GARIS DAHI ── */}
      {[10, 12, 14, 16, 18, 20].map((col) => (
        <rect
          key={col}
          x={col * P}
          y={4 * P}
          width={P * 0.3}
          height={P * 1.5}
          fill={GR}
          style={{ shapeRendering: "crispEdges" }}
        />
      ))}

      {/* ── MUZZLE BG ── */}
      <rect
        x={9 * P}
        y={11 * P}
        width={14 * P}
        height={5 * P}
        fill="#f8f8f8"
        rx={6}
        style={{ shapeRendering: "crispEdges" }}
      />

      {/* ── HIDUNG ── */}
      {px(14, 11, 4, 1, I)}
      {px(14.5, 12, 3, 1, I)}
      {px(15, 13, 2, 0.5, IB)}

      {/* ── MULUT ── */}
      {/* philtrum */}
      <rect x={15.5 * P} y={13 * P} width={P * 0.3} height={P * 0.8} fill={O} />
      
      {sad ? (
        <React.Fragment>
          {/* Sad mouth curve */}
          <path
            d={`M ${11 * P} ${15.5 * P} Q ${16 * P} ${12.5 * P} ${21 * P} ${15.5 * P}`}
            fill="none"
            stroke={O}
            strokeWidth={P * 0.25}
            strokeLinecap="round"
          />
        </React.Fragment>
      ) : !mouthOpen ? (
        <React.Fragment>
          {/* senyum kiri */}
          <path
            d={`M ${9 * P} ${14 * P} Q ${14 * P} ${16.5 * P} ${15.5 * P} ${14 * P}`}
            fill="none"
            stroke={O}
            strokeWidth={P * 0.25}
            strokeLinecap="round"
          />
          {/* senyum kanan */}
          <path
            d={`M ${22.5 * P} ${14 * P} Q ${18 * P} ${16.5 * P} ${16.5 * P} ${14 * P}`}
            fill="none"
            stroke={O}
            strokeWidth={P * 0.25}
            strokeLinecap="round"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Open mouth cavity */}
          <ellipse cx={16 * P} cy={14.8 * P} rx={1.2 * P} ry={1.5 * P} fill={O} />
          <ellipse cx={16 * P} cy={14.8 * P} rx={0.9 * P} ry={1.2 * P} fill="#b91c1c" />
          <ellipse cx={16 * P} cy={15.4 * P} rx={0.7 * P} ry={0.5 * P} fill={I} />
        </React.Fragment>
      )}

      {/* ── KUMIS KIRI ── */}
      {[11, 12.5, 14].map((row, i) => (
        <line
          key={`wl${i}`}
          x1={0}
          y1={row * P}
          x2={9 * P}
          y2={row * P + (i - 1) * P * 0.4}
          stroke={WS}
          strokeWidth={P * 0.18}
          strokeLinecap="round"
        />
      ))}

      {/* ── KUMIS KANAN ── */}
      {[11, 12.5, 14].map((row, i) => (
        <line
          key={`wr${i}`}
          x1={32 * P}
          y1={row * P}
          x2={23 * P}
          y2={row * P + (i - 1) * P * 0.4}
          stroke={WS}
          strokeWidth={P * 0.18}
          strokeLinecap="round"
        />
      ))}

      {/* ── PIPI BLUSH ── */}
      <ellipse cx={8 * P} cy={13 * P} rx={P * 2} ry={P * 0.9} fill={BL} opacity={0.8} />
      <ellipse cx={24 * P} cy={13 * P} rx={P * 2} ry={P * 0.9} fill={BL} opacity={0.8} />

      {/* ── BAWAH KEPALA (chin curve) ── */}
      {px(3, 15, 26, 1, W)}
      {px(2, 15, 1, 1, O)}
      {px(29, 15, 1, 1, O)}
      {px(3, 16, 26, 1, W)}
      {px(2, 16, 1, 1, O)}
      {px(29, 16, 1, 1, O)}
      {px(4, 17, 24, 1, W)}
      {px(3, 17, 1, 1, O)}
      {px(28, 17, 1, 1, O)}
      {px(5, 18, 22, 1, W)}
      {px(4, 18, 1, 1, O)}
      {px(27, 18, 1, 1, O)}
      {px(5, 19, 22, 1, O)}
    </svg>
  );
});

export default ShirooPixelCat;