import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/portafolio")({
  head: () => ({
    meta: [
      { title: "Portafolio | Disseny — Trabajos de metalúrgica y sommier" },
      {
        name: "description",
        content:
          "Serie de trabajos realizados por Disseny: bases de sommier, sillas, mesas, estanterías y proyectos para licitaciones.",
      },
      { property: "og:title", content: "Portafolio | Disseny" },
      {
        property: "og:description",
        content: "Trabajos de metalúrgica y bases de sommier fabricados en Córdoba.",
      },
    ],
  }),
  component: Portafolio,
});

const PIEZAS = [
  ["Base de sommier 2 plazas", "PZ-101", "Ecocuero negro · patas metálicas"],
  ["Silla apilable", "PZ-102", "Caño estructural · pintura en polvo"],
  ["Mesa de comedor", "PZ-103", "Estructura metálica · tapa de madera"],
  ["Estantería industrial", "PZ-104", "Módulos de 5 bandejas"],
  ["Butaca tapizada", "PZ-105", "Ecocuero texturado"],
  ["Mobiliario licitación", "PZ-106", "Serie institucional"],
];

function Portafolio() {
  return (
    <div>
      <PageHeader
        index="Plano 002"
        title="Portafolio"
        lead="Placeholder: selección de piezas fabricadas para mueblerías, mayoristas y organismos. Cada ficha incluirá fotografía de producto, medidas y materiales."
      />

      <Section label="Índice de piezas" title="Trabajos realizados">
        <Carousel opts={{ align: "start", loop: true }} className="mx-auto w-full">
          <CarouselContent>
            {PIEZAS.map(([titulo, code, detalle]) => (
              <CarouselItem key={code} className="sm:basis-1/2 lg:basis-1/3">
                <article className="plate flex h-full flex-col rounded-md p-5">
                  <div className="flex aspect-4/3 items-center justify-center border border-dashed border-border/70 bg-blueprint-deep/50">
                    <span className="annotation">Imagen de producto</span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <h3 className="text-base uppercase">{titulo}</h3>
                    <span className="annotation text-signal-yellow">{code}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{detalle}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselPrevious className="static translate-x-0 translate-y-0" />
            <CarouselNext className="static translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </Section>
    </div>
  );
}
