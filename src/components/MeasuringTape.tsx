import { useCallback, useEffect, useState } from "react";

import "./MeasuringTape.css";

type SectionEntry = { id: string; label: string };

/**
 * Tira de marcas numeradas que se comporta como una cinta métrica real:
 * a medida que se scrollea, los números "corren" verticalmente (un único
 * transform en el contenedor, sin recalcular cada marca) simulando la cinta
 * desenrollándose.
 */
function TapeStrip({ heightPx }: { heightPx: number }) {
  const spacing = 16; // px entre marcas menores
  const majorEvery = 5; // cada 5ta marca lleva número
  const count = Math.max(0, Math.ceil(heightPx / spacing)) + 80;
  const marks = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      className="tape-strip"
      style={{
        height: `${count * spacing}px`,
        transform: `translateY(calc(-1 * var(--tape-scroll, 0px)))`,
      }}
    >
      {marks.map((i) => {
        const isMajor = i % majorEvery === 0;
        return (
          <div
            key={i}
            className="tape-mark"
            data-major={isMajor ? "true" : "false"}
            style={{ top: `${i * spacing}px` }}
          >
            <span className="tape-mark__line" aria-hidden="true" />
            {isMajor && <span className="tape-mark__num">{i}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default function MeasuringTape({ pathname }: { pathname: string }) {
  const [sections, setSections] = useState<SectionEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [docHeight, setDocHeight] = useState(0);

  const collect = useCallback(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ruler-section]"));
    setSections(
      nodes.map((node) => ({
        id: node.id,
        label: node.dataset["rulerSection"] || node.id,
      })),
    );
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(collect);
    const timer = window.setTimeout(collect, 400);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [collect, pathname]);

  useEffect(() => {
    const el = document.documentElement;
    let frame = 0;
    const updateHeight = () => setDocHeight(el.scrollHeight);
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        el.style.setProperty("--tape-scroll", `${y}px`);

        let current: string | null = null;
        for (const section of sections) {
          const target = document.getElementById(section.id);
          if (!target) continue;
          if (target.getBoundingClientRect().top <= window.innerHeight * 0.35) {
            current = section.id;
          }
        }
        setActiveId(current ?? sections[0]?.id ?? null);
      });
    };
    updateHeight();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", updateHeight);
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      className="measuring-tape flex h-full flex-col justify-center"
      aria-label="Índice de la página"
    >
      <div className="tape-window" aria-hidden="true">
        <TapeStrip heightPx={docHeight} />
      </div>
      <span className="tape-reader-line" aria-hidden="true" />

      <ul className="tape-nav-list">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              type="button"
              className="tape-nav-item font-technical"
              data-active={activeId === section.id ? "true" : "false"}
              aria-current={activeId === section.id ? "true" : undefined}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="tape-nav-item__bar" aria-hidden="true" />
              <span className="tape-nav-item__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="tape-nav-item__label">{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
