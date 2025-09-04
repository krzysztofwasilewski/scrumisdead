import React from "react";
import { motion } from "framer-motion";

type Variant = "solid" | "outline";
export function Button({
  className = "",
  children,
  variant = "solid" as Variant,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "rounded-2xl px-4 py-2 text-sm font-semibold transition-all shadow";
  const solid = "bg-rose-700 hover:bg-rose-600 text-white";
  const outline =
    "border border-rose-600 text-rose-300 hover:bg-rose-700 hover:text-white";
  const classes = `${base} ${
    variant === "solid" ? solid : outline
  } ${className}`;

  return (
    <motion.button
      className={classes}
      whileHover={{
        scale: [1, 1.05, 0.95, 1.02, 1],
        rotate: [0, -1, 1, 0],
        filter: "hue-rotate(10deg) saturate(1.2)",
      }}
      whileTap={{
        scale: 0.95,
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
