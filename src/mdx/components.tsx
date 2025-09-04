
import React from 'react';

export const MDXComponents = {
  h1: (props: any) => <h1 {...props} className="text-4xl md:text-6xl font-black tracking-tight uppercase" />,
  h2: (props: any) => <h2 {...props} className="mt-10 text-2xl md:text-3xl font-extrabold" />,
  p: (props: any) => <p {...props} className="mt-4 leading-7 text-zinc-300" />,
  ul: (props: any) => <ul {...props} className="mt-4 list-disc pl-6 text-zinc-300" />,
  ol: (props: any) => <ol {...props} className="mt-4 list-decimal pl-6 text-zinc-300" />,
  code: (props: any) => <code {...props} className="rounded bg-zinc-800 px-1 py-0.5 text-sm" />,
  pre: (props: any) => <pre {...props} className="mt-4 overflow-auto rounded-xl bg-zinc-900 p-4 text-sm" />,
  blockquote: (props: any) => <blockquote {...props} className="mt-6 border-l-4 pl-4 italic text-zinc-400 border-accent" />,
  a: (props: any) => <a {...props} className="underline decoration-2 underline-offset-4 text-accent hover:opacity-90" />,
};
