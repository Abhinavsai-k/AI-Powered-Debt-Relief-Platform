import { useEffect, useState } from "react";

export default function Spotlight() {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        background: `radial-gradient(
          350px circle at ${mouse.x}px ${mouse.y}px,
          rgba(59,130,246,.15),
          transparent 70%
        )`,
      }}
    />
  );
}