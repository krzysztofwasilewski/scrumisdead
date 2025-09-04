import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Skull } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "./components/PageTransition";

export default function Layout() {
  return (
    <div className="min-h-screen text-zinc-200">
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
                ANARCHIC
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
      <footer className="border-t border-accent bg-black/60 mt-20">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-zinc-400">
          <div>
            <div className="flex items-center gap-2 font-black tracking-widest uppercase">
              <Skull className="h-4 w-4 text-accent" /> ANARCHIC
            </div>
            <p className="mt-3 max-w-sm">
              No roadmaps, only feedback loops. No ceremonies, only
              conversations.
            </p>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-widest mb-2">
              Navigate
            </p>
            <ul className="space-y-1">
              <li>
                <motion.div
                  whileHover={{
                    scale: [1, 1.05, 0.95, 1],
                    x: [0, -2, 2, 0],
                    filter: "hue-rotate(20deg) saturate(1.2)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/" className="hover:text-accent">
                    Home
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  whileHover={{
                    scale: [1, 1.05, 0.95, 1],
                    x: [0, 2, -2, 0],
                    filter: "hue-rotate(-20deg) saturate(1.2)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/archive" className="hover:text-accent">
                    Archive
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div
                  whileHover={{
                    scale: [1, 1.05, 0.95, 1],
                    rotate: [0, -5, 5, 0],
                    filter: "hue-rotate(30deg) saturate(1.3)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="hover:text-accent">
                    RSS
                  </a>
                </motion.div>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-zinc-500 uppercase tracking-widest mb-2">
              Contact
            </p>
            <p>matrix://anarchy.blog</p>
            <p className="mt-2">cc: chaos@anarchy.blog</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
