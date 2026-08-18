import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  ClientOnly,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import paperTexture from "../assets/blueprint-paper.jpg";
import rulerMetal from "../assets/ruler-metal.jpg";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Logo } from "../components/site/Logo";
import MeasuringTape from "../components/MeasuringTape";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/portafolio", label: "Portafolio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/cotizador", label: "Cotizador" },
  { to: "/contacto", label: "Contacto" },
] as const;

function SiteSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="ruler-rail fixed inset-y-0 left-0 z-40 hidden w-[64px] lg:block"
      style={{ ["--ruler-texture" as string]: `url(${rulerMetal})` }}
      aria-label="Índice de la página"
    >
      <MeasuringTape pathname={pathname} />
    </aside>
  );
}

function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-wrap items-center gap-x-1 gap-y-2">
      {NAV.map((item) => {
        const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === "/" }}
            className="relative px-3 py-2 font-technical text-sm uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
            activeProps={{
              className:
                "relative px-3 py-2 font-technical text-sm uppercase tracking-[0.18em] text-primary",
            }}
          >
            {item.label}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute inset-x-2 -bottom-0.5 h-[2px] bg-primary"
                style={{ boxShadow: "0 0 8px oklch(0.82 0.16 88 / 60%)" }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <ClientOnly fallback={<>{children}</>}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ClientOnly>
  );
}

function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div
      className="blueprint-surface paper-grain min-h-screen"
      style={{ ["--paper-texture" as string]: `url(${paperTexture})` }}
    >
      <SiteSidebar />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:pl-[104px]">
        <div className="caution-tape h-1.5 w-full opacity-70" />
        <header className="flex flex-wrap items-center justify-between gap-6 py-6">
          <Logo />
          <SiteNav />
        </header>

        <main className="pb-20">
          <RouteTransition>{children}</RouteTransition>
        </main>

        <footer className="border-t border-border/70 py-10">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div>
              <p className="font-display text-lg uppercase tracking-[0.18em]">Disseny</p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Bases de sommier en ecocuero y metalúrgica a medida para mueblerías, mayoristas y
                licitaciones. Córdoba, Argentina.
              </p>
            </div>
            <div className="grid gap-2">
              <p className="annotation">Contacto</p>
              <p className="text-sm text-muted-foreground">ventas@disseny.com.ar</p>
              <p className="text-sm text-muted-foreground">+54 351 000 0000</p>
              <p className="text-sm text-muted-foreground">Córdoba Capital, Argentina</p>
            </div>
          </div>
          <p className="annotation mt-8">
            © {new Date().getFullYear()} Disseny — Rev. A · Documento de obra
          </p>
        </footer>
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <SiteChrome>
      <div className="py-24 text-center">
        <p className="annotation">Error 404 · Plano no encontrado</p>
        <h1 className="mt-4 text-6xl uppercase">404</h1>
        <p className="mt-3 text-muted-foreground">
          La página que buscás no existe o fue archivada.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center border-2 border-primary px-6 py-3 font-technical text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Volver al inicio
        </Link>
      </div>
    </SiteChrome>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteChrome>
      <div className="py-24 text-center">
        <p className="annotation">Falla de carga</p>
        <h1 className="mt-4 text-3xl uppercase">Esta página no cargó</h1>
        <p className="mt-3 text-muted-foreground">
          Algo salió mal. Podés reintentar o volver al inicio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border-2 border-primary px-6 py-3 font-technical text-sm uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 font-technical text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </SiteChrome>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Disseny | Bases de sommier y metalúrgica a medida" },
      {
        name: "description",
        content:
          "Fábrica en Córdoba de bases de sommier en ecocuero y trabajos de metalúrgica a medida y en cantidad para mueblerías y mayoristas.",
      },
      { name: "author", content: "Disseny" },
      { property: "og:title", content: "Disseny | Metalúrgica y bases de sommier" },
      {
        property: "og:description",
        content:
          "Producción en serie y a medida: bases de sommier en ecocuero, sillas, mesas, estanterías y licitaciones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600&family=Barlow:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteChrome>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </SiteChrome>
    </QueryClientProvider>
  );
}
