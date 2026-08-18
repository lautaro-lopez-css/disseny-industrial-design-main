import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { lazy } from "react";
import heroImage from "@/assets/hero-workbench.jpg";
import { Plate, Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import BlurText from "@/components/BlurText";
import StarBorder from "@/components/StarBorder";

const LightRays = lazy(() => import("@/components/LightRays"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Disseny | Fábrica de bases de sommier y metalúrgica en Córdoba" },
      {
        name: "description",
        content:
          "Bases de sommier en ecocuero y metalúrgica a medida y en cantidad para mueblerías, mayoristas y licitaciones en Córdoba, Argentina.",
      },
      { property: "og:title", content: "Disseny | Bases de sommier y metalúrgica" },
      {
        property: "og:description",
        content: "Producción en serie y a medida para mueblerías y compradores mayoristas.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <div>
      <section
        id="inicio"
        data-ruler-section="Inicio"
        className="scroll-mt-24 grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_1fr]"
      >
        <div>
          <p className="annotation">Plano 001 · Producción industrial desde 1998</p>
          <BlurText
            as="h1"
            text="Diseñamos y fabricamos lo que tu proyecto necesita"
            animateBy="words"
            direction="top"
            delay={150}
            className="rule-tick mt-5 font-display text-4xl font-bold uppercase leading-[0.95] text-signal-yellow sm:text-6xl"
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Fabricamos bases de sommier en ecocuero y resolvemos trabajos de metalúrgica a medida y
            en cantidad. Trabajamos con mueblerías, compradores mayoristas y licitaciones en todo el
            país.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <StarBorder as={Link} to="/cotizador" color="#F2B705" speed="6s" thickness={2}>
              Pedí tu cotización
            </StarBorder>
            <Link
              to="/portafolio"
              className="border border-border px-7 py-3 font-technical text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Ver portafolio
            </Link>
          </div>
        </div>

        <figure className="relative">
          <div className="absolute -inset-3 border border-border/60" />
          <div className="relative overflow-hidden shadow-[var(--shadow-studio)]">
            <img
              src={heroImage}
              alt="Base de sommier en ecocuero junto a estructura metálica y planos técnicos en taller"
              width={1536}
              height={1024}
              className="block w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
              <ClientOnly>
                <LightRays
                  raysOrigin="top-left"
                  raysColor="#F2B705"
                  rayLength={2}
                  lightSpread={0.5}
                  followMouse
                  mouseInfluence={0.1}
                  saturation={1}
                />
              </ClientOnly>
            </div>
          </div>
          <figcaption className="annotation mt-4">
            Fig. 01 — Ecocuero + estructura de caño estructural
          </figcaption>
        </figure>
      </section>

      <Section label="Especificaciones" title="Capacidad de fábrica">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Plate title="Bases de sommier" code="ESP-01" delay={0}>
            Placeholder: medidas estándar y especiales, tapizado en ecocuero, terminación reforzada.
          </Plate>
          <Plate title="Metalúrgica a medida" code="ESP-02" delay={90}>
            Placeholder: desarrollo de piezas según plano del cliente, soldadura y pintura en polvo.
          </Plate>
          <Plate title="Producción en cantidad" code="ESP-03" delay={180}>
            Placeholder: series para mueblerías y mayoristas con plazos y logística acordados.
          </Plate>
          <Plate title="Licitaciones" code="ESP-04" delay={270}>
            Placeholder: documentación técnica, muestras y cumplimiento de pliegos.
          </Plate>
        </div>
      </Section>

      <Section label="Registro de obra" title="Números de planta">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["+25", "Años de producción"],
            ["+300", "Clientes mayoristas"],
            ["100%", "Fabricación propia"],
          ].map(([value, label], i) => (
            <Reveal key={label} delay={i * 100}>
              <div className="plate rounded-md px-6 py-8">
                <p className="font-display text-4xl text-signal-yellow">{value}</p>
                <p className="annotation mt-3">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="mt-14 flex flex-wrap items-center justify-between gap-6 border-l-4 border-accent bg-blueprint-deep/60 p-8">
        <div>
          <h2 className="text-2xl uppercase">¿Necesitás una cotización por volumen?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Contanos medidas, materiales y cantidades. Respondemos en 48 horas hábiles.
          </p>
        </div>
        <Link
          to="/contacto"
          className="border-2 border-accent px-7 py-3 font-technical text-sm uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Contactar ventas
        </Link>
      </section>
    </div>
  );
}
