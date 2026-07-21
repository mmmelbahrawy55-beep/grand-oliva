"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll("a, button, [data-cursor-hover]");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Observe DOM changes for new hoverable elements
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });
    handleElementHover();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#c9a96e] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#c9a96e]/50 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.8 : isClicking ? 0.8 : 1,
          borderColor: isHovering ? "rgba(201,169,110,0.8)" : "rgba(201,169,110,0.3)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      />

      {/* Trailing glow */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-[#c9a96e]/5 rounded-full pointer-events-none z-[9997] blur-xl hidden md:block"
        animate={{
          x: position.x - 48,
          y: position.y - 48,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
      />
    </>
  );
}
