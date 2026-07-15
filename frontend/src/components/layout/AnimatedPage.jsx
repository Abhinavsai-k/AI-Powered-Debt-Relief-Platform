import { motion } from "framer-motion";

export default function AnimatedPage({
  children,
  className = "",
  style = {},
}) {
  return (
    <motion.main
      className={className}
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -30,
        scale: 0.98,
      }}
      transition={{
        duration: .45,
        ease: [0.22,1,0.36,1],
      }}
    >
      {children}
    </motion.main>
  );
}