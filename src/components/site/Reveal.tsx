import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Envoltorio liviano que revela su contenido (fade + subida) cuando entra en
 * el viewport, con soporte de stagger via `delay`. Pensado para tarjetas,
 * imágenes y bloques completos — no reemplaza a <RevealText />, que anima
 * palabra por palabra.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "article" | "li" | "figure" | "section";
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 620ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 620ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}

/**
 * Grilla de reveals en cascada: envolvé un array de items y cada uno se
 * anima con un pequeño desfasaje respecto al anterior, como en weeph.com.
 */
export function RevealGroup({
  children,
  stagger = 90,
  className = "",
}: {
  children: ReactNode[];
  stagger?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
