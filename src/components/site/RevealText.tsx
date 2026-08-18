import { lazy } from "react";
import { ClientOnly } from "@tanstack/react-router";

const ScrollReveal = lazy(() => import("@/components/ScrollReveal"));

/**
 * Texto explicativo con revelado palabra por palabra al hacer scroll.
 * En SSR / sin JS se muestra el párrafo plano.
 */
export function RevealText({ children, className = "" }: { children: string; className?: string }) {
  const fallback = (
    <p className={`scroll-reveal-text my-5 text-muted-foreground ${className}`.trim()}>
      {children}
    </p>
  );

  return (
    <ClientOnly fallback={fallback}>
      <ScrollReveal
        baseOpacity={0.15}
        enableBlur
        baseRotation={2}
        blurStrength={3}
        textClassName={`text-muted-foreground ${className}`.trim()}
      >
        {children}
      </ScrollReveal>
    </ClientOnly>
  );
}
