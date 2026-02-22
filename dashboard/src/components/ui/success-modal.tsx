"use client";

import { useEffect, useState } from "react";

interface SuccessModalProps {
  message: string;
}

export function SuccessModal({ message }: SuccessModalProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-10 py-8 flex flex-col items-center gap-4 animate-in zoom-in-90 duration-200">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="34" stroke="black" strokeWidth="4" fill="#22c55e" />
          <polyline
            points="20,37 31,48 52,26"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: 0,
              animation: "draw-check 0.4s ease forwards",
            }}
          />
        </svg>
        <style>{`
          @keyframes draw-check {
            from { stroke-dashoffset: 50; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
        <p className="text-xl font-black tracking-tight text-center">{message}</p>
      </div>
    </div>
  );
}
