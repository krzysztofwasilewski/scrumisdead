import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { listPosts } from "../content";

export default function Archive() {
  const posts = listPosts();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Helmet>
        <title>Archive | Unagile.me</title>
      </Helmet>
      <h1 className="text-5xl font-black uppercase">Archive</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-accent/30 pb-4">
            <Link to={`/post/${p.slug}`} className="block">
              <div className="text-sm uppercase tracking-widest text-accent">
                {p.tag} • {new Date(p.date).toLocaleDateString()}
              </div>
              <div className="text-2xl font-extrabold">{p.title}</div>
              {p.excerpt && <p className="text-zinc-400">{p.excerpt}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
