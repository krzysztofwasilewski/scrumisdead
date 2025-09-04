import React from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Skull, Flame, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { listPosts } from "../content";
import "../styles.css";

const SLOGANS = [
  "scrum is dead",
  "burn the backlog",
  "certifications are cargo cult",
  "sprint to nowhere",
  "plan less, learn more",
  "deadline is a myth",
  "ship ugly, learn fast",
];

// Get actual posts from content system
const posts = listPosts();

const HoverJitter: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => (
  <motion.span
    className={className}
    whileHover={{ rotate: [0, -2, 2, 0], x: [0, -2, 2, 0] }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.span>
);

const Background = () => (
  <div className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br bg-grad-split" />
    <div className="absolute inset-0 mix-blend-overlay opacity-40 [background-image:radial-gradient(black_1px,transparent_1px)] [background-size:3px_3px]" />
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"2\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(#n)\" opacity=\"0.25\"/></svg>`
        )}')`,
        animation: "grain 1.2s steps(6) infinite",
      }}
    />
    <style>{`
      @keyframes grain {
        0%{transform:translate(0,0)} 20%{transform:translate(-5%, -10%)} 40%{transform:translate(-15%, 5%)} 60%{transform:translate(7%, -25%)} 80%{transform:translate(-5%, 25%)} 100%{transform:translate(0,0)}
      }
    `}</style>
  </div>
);

const GlitchText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => (
  <div
    className={`relative inline-block select-none ${className ?? ""}`}
    aria-label={text}
  >
    <span className="relative z-10">{text}</span>
    <span
      className="absolute inset-0 translate-x-[1px] translate-y-[-1px] text-rose-500 blur-[0.5px] opacity-70"
      aria-hidden
    >
      {text}
    </span>
    <span
      className="absolute inset-0 translate-x-[-1px] translate-y-[1px] text-cyan-400 blur-[0.5px] opacity-70"
      aria-hidden
    >
      {text}
    </span>
  </div>
);

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

const FeaturedCard: React.FC<{
  title: string;
  excerpt?: string;
  tag?: string;
  slug: string;
  index: number;
}> = ({ title, excerpt, tag, slug, index }) => (
  <motion.article
    className="relative"
    initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -2 : 3 }}
    whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 2 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: 0.05 * index }}
  >
    <Card className="group border-rose-700/60 bg-zinc-900/60 backdrop-blur-sm shadow-2xl shadow-black/30 hover:-rotate-1 hover:scale-[1.01] transition-all duration-300">
      <CardContent className="p-6">
        {tag && (
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
            <Flame className="h-3.5 w-3.5" /> {tag}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-black text-zinc-100 leading-tight">
          <HoverJitter>
            <GlitchText text={title} />
          </HoverJitter>
        </h3>
        {excerpt && <p className="mt-3 text-zinc-300/90">{excerpt}</p>}
        <div className="mt-5">
          <Link to={`/post/${slug}`}>
            <Button variant="outline">Read Manifesto</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    <div className="absolute -top-2 -left-2 rotate-[-6deg]">
      <div className="h-6 w-20 bg-rose-700/80 shadow-md" />
    </div>
  </motion.article>
);

const Marquee: React.FC = () => (
  <div className="relative overflow-hidden border-y border-accent bg-black">
    <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" />
    <motion.div
      className="flex whitespace-nowrap py-2 text-sm md:text-base font-mono tracking-wider"
      animate={{ x: [0, -800] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 24 }}
    >
      {[...Array(6)].map((_, i) => (
        <span key={i} className="mx-6 text-accent">
          ✶ no gods • no masters • no roadmaps • only signals
        </span>
      ))}
    </motion.div>
  </div>
);

export default function Home() {
  const [index, setIndex] = React.useState(0);
  const controls = useAnimation();

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLOGANS.length);
      controls.start({
        y: [0, -6, 0],
        skewX: [0, -2, 0],
        transition: { duration: 0.45 },
      });
    }, 2500);
    return () => clearInterval(id);
  }, [controls]);

  return (
    <main className="min-h-screen text-zinc-200">
      <Background />

      <header className="sticky top-0 z-40 border-b border-accent/50 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-2 font-black tracking-widest uppercase"
            >
              <Skull className="h-5 w-5 text-accent" />
              <span className="sr-only">Anarchic Blog</span>
              <GlitchText text="ANARCHIC" />
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a className="hover:text-white text-zinc-300" href="#">
                Posts
              </a>
              <a className="hover:text-white text-zinc-300" href="#">
                About
              </a>
              <a className="hover:text-white text-zinc-300" href="#">
                RSS
              </a>
              <Button className="ml-2">Subscribe</Button>
            </nav>
          </div>
        </div>
      </header>

      <Marquee />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                <Zap className="h-3.5 w-3.5" />
                experimental blog
              </p>
              <motion.h1
                className="text-[12vw] md:text-[8rem] leading-[0.85] font-black uppercase"
                animate={controls}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                    className="block"
                  >
                    <GlitchText text={SLOGANS[index]} />
                  </motion.span>
                </AnimatePresence>
              </motion.h1>
              <p className="mt-6 max-w-2xl text-lg text-zinc-300">
                Essays & artefacts from the edges of product and
                engineering—where process melts and learning hardens. Break the
                frame. Keep the signal.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button>Start Reading</Button>
                <Button variant="outline">Random Post</Button>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="relative">
                <motion.div
                  className="absolute -left-6 -top-6 h-16 w-16 rotate-12 bg-accent shadow-2xl"
                  animate={{ rotate: [12, 10, 14, 12] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />
                <motion.div className="rotate-[-2deg]">
                  <Card className="border-accent/70 bg-black/60 backdrop-blur-sm">
                    <CardContent className="p-0 overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-3xl font-black uppercase leading-none">
                          <HoverJitter>
                            <GlitchText text="Poster Art" />
                          </HoverJitter>
                        </h3>
                        <p className="mt-3 text-sm text-zinc-300/90">
                          Angular grids, torn edges, loud type. Motion as
                          punctuation, not decoration.
                        </p>
                      </div>
                      <JaggedDivider />
                      <div className="p-6">
                        <ul className="space-y-1 text-sm text-zinc-400">
                          <li>• Skewed layouts</li>
                          <li>• Grain + halftone textures</li>
                          <li>• Micro‑glitch on hover</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured" className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-20">
          <h2
            id="featured"
            className="mb-6 text-sm uppercase tracking-widest text-accent"
          >
            Latest manifests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <FeaturedCard
                key={p.slug}
                index={i}
                title={p.title}
                excerpt={p.excerpt}
                tag={p.tag}
                slug={p.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-accent bg-black/60">
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
                <a href="#" className="hover:text-accent">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent">
                  Archive
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent">
                  About
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
    </main>
  );
}
