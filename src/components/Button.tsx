
import React from "react";

type Variant = "solid" | "outline";
export function Button({ className = "", children, variant = "solid" as Variant, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base = "rounded-2xl px-4 py-2 text-sm font-semibold transition-all shadow";
  const solid = "bg-rose-700 hover:bg-rose-600 text-white";
  const outline = "border border-rose-600 text-rose-300 hover:bg-rose-700 hover:text-white";
  const classes = `${base} ${variant === "solid" ? solid : outline} ${className}`;
  return <button className={classes} {...props}>{children}</button>;
}
