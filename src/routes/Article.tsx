import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { getPost } from "../content";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "../mdx/components";

const JaggedDivider = () => (
  <svg
    className="w-full h-8 text-accent"
    viewBox="0 0 1200 100"
    preserveAspectRatio="none"
    aria-hidden
  >
    <polygon points="0,0 1200,0 1200,100 0,40" className="fill-current" />
  </svg>
);

export default function Article() {
  const { slug } = useParams();
  const entry = slug ? getPost(slug) : undefined;

  if (!entry) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20">
        <Helmet>
          <title>404 - Article Not Found | Unagile.me</title>
        </Helmet>
        <h1 className="text-4xl font-black">404</h1>
        <p className="mt-2 text-zinc-400">No manifesto found.</p>
        <Link to="/" className="mt-6 inline-block underline text-accent">
          Back to home
        </Link>
      </main>
    );
  }

  const Mdx = entry.component;
  const { title, date, tag } = entry.meta;

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>{title} | Unagile.me</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            url: `https://unagile.me/post/${entry.meta.slug}`,
            datePublished: entry.meta.date,
            dateModified: entry.meta.date,
            author: {
              "@type": "Person",
              name: "Unagile.me",
              url: "https://unagile.me",
            },
            publisher: {
              "@type": "Organization",
              name: "Unagile.me",
              url: "https://unagile.me",
            },
            description: entry.meta.excerpt || title,
            articleSection: entry.meta.tag,
            keywords: entry.meta.tag,
            inLanguage: "en-US",
            isPartOf: {
              "@type": "Blog",
              name: "Scrum is dead. Unagile.me",
              url: "https://unagile.me",
            },
          })}
        </script>
      </Helmet>
      <motion.div
        className="bg-grad-split border-b border-accent/50"
        style={{ fontFamily: "inherit" }}
        initial={{ opacity: 0, y: -50, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mx-auto max-w-4xl px-4 py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.p
            className="uppercase tracking-widest text-xs text-accent"
            style={{
              fontFamily: "inherit",
              letterSpacing: "normal",
              lineHeight: "normal",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {tag}
          </motion.p>
          <motion.h1
            className="mt-2 text-[12vw] md:text-[6rem] leading-[0.85] font-black uppercase"
            style={{
              fontFamily: "inherit",
              letterSpacing: "normal",
              lineHeight: "normal",
            }}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              scale: [1, 1.02, 0.98, 1.01, 1],
              rotate: [0, -1, 1, 0],
              filter: "hue-rotate(10deg) saturate(1.1)",
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-2 text-zinc-400"
            style={{
              fontFamily: "inherit",
              letterSpacing: "normal",
              lineHeight: "normal",
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            {new Date(date).toLocaleDateString()}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <JaggedDivider />
        </motion.div>
      </motion.div>
      <motion.article
        className="mx-auto max-w-3xl px-4 py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <MDXProvider components={MDXComponents}>
          <Mdx />
        </MDXProvider>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <motion.div
            whileHover={{
              scale: [1, 1.05, 0.95, 1],
              x: [0, -5, 5, 0],
              filter: "hue-rotate(15deg) saturate(1.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/archive" className="underline text-accent">
              ← Archive
            </Link>
          </motion.div>
        </motion.div>
      </motion.article>
    </main>
  );
}
