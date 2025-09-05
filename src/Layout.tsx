import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Skull } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "./components/PageTransition";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="min-h-screen text-zinc-200">
      <ScrollToTop />
      <header className="sticky top-0 z-40 border-b border-accent/50 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <motion.div
              whileHover={{
                scale: [1, 1.05, 0.95, 1.02, 1],
                rotate: [0, -2, 2, -1, 0],
                filter: "hue-rotate(10deg) saturate(1.2)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Link
                to="/"
                className="flex items-center gap-2 font-black tracking-widest uppercase"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Skull className="h-5 w-5 text-accent" />
                </motion.div>
                UNAGILE.ME
              </Link>
            </motion.div>
            <nav className="flex items-center gap-6 text-sm">
              <motion.div
                whileHover={{
                  scale: [1, 1.1, 0.9, 1.05, 1],
                  rotate: [0, -1, 1, 0],
                  filter: "hue-rotate(15deg) saturate(1.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Link className="hover:text-white text-zinc-300" to="/archive">
                  Archive
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: [1, 1.1, 0.9, 1.05, 1],
                  rotate: [0, 1, -1, 0],
                  filter: "hue-rotate(-15deg) saturate(1.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Link className="hover:text-white text-zinc-300" to="/about">
                  About
                </Link>
              </motion.div>
            </nav>
          </div>
        </div>
      </header>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </div>
  );
}
