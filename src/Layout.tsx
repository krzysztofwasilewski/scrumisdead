import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Skull } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen text-zinc-200">
      <header className="sticky top-0 z-40 border-b border-accent/50 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 font-black tracking-widest uppercase"
            >
              <Skull className="h-5 w-5 text-accent" />
              ANARCHIC
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link className="hover:text-white text-zinc-300" to="/archive">
                Archive
              </Link>
              <Link className="hover:text-white text-zinc-300" to="/about">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
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
                <Link to="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-accent">
                  Archive
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent">
                  RSS
                </a>
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
