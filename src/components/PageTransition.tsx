import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      rotateX: -15,
      filter: "hue-rotate(180deg) saturate(2) contrast(1.5)",
    },
    in: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      filter: "hue-rotate(0deg) saturate(1) contrast(1)",
    },
    out: {
      opacity: 0,
      scale: 1.05,
      rotateX: 15,
      filter: "hue-rotate(-90deg) saturate(1.5) contrast(1.2)",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  const glitchVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
      x: -20,
    },
    in: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
    },
    out: {
      opacity: 0,
      scale: 1.2,
      rotate: 5,
      x: 20,
    },
  };

  const glitchTransition = {
    type: "spring",
    stiffness: 100,
    damping: 15,
    duration: 0.8,
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Glitch overlay during transition */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial="initial"
          animate="in"
          exit="out"
          variants={glitchVariants}
          transition={glitchTransition}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-cyan-400/20 mix-blend-difference" />
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1)_0%,transparent_50%)] animate-pulse" />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
