
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPost } from '../content';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '../mdx/components';

const JaggedDivider = () => (
  <svg className="w-full h-8 text-accent" viewBox="0 0 1200 100" preserveAspectRatio="none" aria-hidden>
    <polygon points="0,0 1200,0 1200,100 0,40" className="fill-current" />
  </svg>
);

export default function Article(){
  const { slug } = useParams();
  const entry = slug ? getPost(slug) : undefined;

  if(!entry){
    return <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-4xl font-black">404</h1>
      <p className="mt-2 text-zinc-400">No manifesto found.</p>
      <Link to="/" className="mt-6 inline-block underline text-accent">Back to home</Link>
    </main>;
  }

  const Mdx = entry.component;
  const { title, date, tag } = entry.meta;

  return (
    <main className="min-h-screen">
      <div className="bg-grad-split border-b border-accent/50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <p className="uppercase tracking-widest text-xs text-accent">{tag}</p>
          <h1 className="mt-2 text-[12vw] md:text-[6rem] leading-[0.85] font-black uppercase">{title}</h1>
          <p className="mt-2 text-zinc-400">{new Date(date).toLocaleDateString()}</p>
        </div>
        <JaggedDivider />
      </div>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <MDXProvider components={MDXComponents}>
          <Mdx />
        </MDXProvider>
        <div className="mt-12">
          <Link to="/archive" className="underline text-accent">← Archive</Link>
        </div>
      </article>
    </main>
  )
}
