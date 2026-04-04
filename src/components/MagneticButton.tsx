import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const MagneticButton = ({ children, className = "", onClick, type = "button" }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <motion.button
        type={type}
        onClick={onClick}
        className={`relative overflow-hidden ${className}`}
        whileTap={{ scale: 0.95 }}
        data-hover
      >
        <motion.span
          className="relative z-10 block"
          animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          {children}
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default MagneticButton;
