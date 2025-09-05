import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        element: (
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-5xl font-black uppercase">About</h1>
            <p className="mt-4 text-zinc-300">
              I have been part of SCRUM world for the last 23 years. This
              madness needs to stop. Do you need help? Let's talk.{" "}
              <a href="mailto:help@unagile.me" className="hover:text-accent">
                help@unagile.me
              </a>
            </p>
          </div>
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
