import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function PageHeader({ index, title, lead }: { index: string; title: string; lead: string }) {
  return (
    <header
      id={slug(title)}
      data-ruler-section={title}
      className="scroll-mt-24 border-b border-border/70 pb-10"
    >
      <p className="annotation">{index} — Disseny S.R.L. · Escala 1:1</p>
      <h1 className="rule-tick mt-4 text-4xl uppercase sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {lead}
      </p>
    </header>
  );
}

export function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={slug(title)}
      data-ruler-section={title}
      className="scroll-mt-24 border-b border-border/50 py-14"
    >
      <Reveal>
        <p className="annotation">{label}</p>
        <h2 className="mt-3 text-2xl uppercase sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function Plate({
  title,
  code,
  children,
  delay = 0,
}: {
  title: string;
  code: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="plate group relative rounded-md p-6">
        <span className="annotation absolute right-4 top-4 text-signal-yellow">{code}</span>
        <h3 className="text-lg uppercase">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</p>
      </article>
    </Reveal>
  );
}
