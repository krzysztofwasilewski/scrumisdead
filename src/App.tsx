import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { motion } from "framer-motion";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Layout from "./Layout";
import Home from "./routes/Home";
import Article from "./routes/Article";
import Archive from "./routes/Archive";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:slug", element: <Article /> },
      { path: "archive", element: <Archive /> },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

// About page component with dynamic title
function AboutPage() {
  return (
    <div className="min-h-screen text-zinc-200">
      <Helmet>
        <title>About the Rebellion | Unagile.me</title>
      </Helmet>
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute -left-8 -top-8 h-20 w-20 rotate-12 bg-accent shadow-2xl" />
          <motion.h1
            className="relative text-6xl md:text-8xl font-black uppercase leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About the
            <br />
            <span className="text-accent">Rebellion</span>
          </motion.h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-black uppercase text-accent mb-4">
                The Problem
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                I’ve been trapped in the SCRUM industrial complex for 23 years
                in roles such as a software developer, project manager, team
                manager, scrum master, product owner, agile coach, director of
                operations, and C-level exec. Watched it metastasize from a
                simple framework into a hollow shell that values ceremony over
                outcomes, process over people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-black uppercase text-accent mb-4">
                The Mission
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                This madness needs to stop. No more fake sprint planning. No
                more retrospective lip service. Time to burn the backlog and
                build what matters.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl font-black uppercase text-accent mb-4">
                The Call
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Ready to unagile your organization? Let’s talk about what
                actually works when you stop pretending that process innovation
                is the same as product innovation.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:help@unagile.me"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-black uppercase tracking-wider hover:bg-accent/90 transition-colors"
                >
                  <span>Start the Revolution</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Side Panel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="sticky top-8">
              <div className="border border-accent/50 bg-black/60 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-xl font-black uppercase mb-6 text-accent">
                  Manifesto Points
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-black">01</span>
                    <span>Scope is fixed. Everything else adapts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-black">02</span>
                    <span>Meetings are a tax on productivity.</span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-accent font-black">04</span>
                    <span>Retrospectives without action are theater.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-black">05</span>
                    <span>Process innovation ≠ Product innovation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-xl text-zinc-400 mb-6">
            “The best way to predict the future is to build it. The best way to
            build it is to stop pretending you can plan it.”
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:chaos@scrumisdead.org"
              className="hover:text-accent transition-colors"
            >
              chaos@scrumisdead.org
            </a>
            <span className="text-zinc-600">•</span>
            <a
              href="https://scrumisdead.org"
              className="hover:text-accent transition-colors"
            >
              scrumisdead.org
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
