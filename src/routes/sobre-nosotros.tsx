import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { RevealText } from "@/components/site/RevealText";
import { NotePad } from "@/components/NotePad";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros | Disseny — Fábrica metalúrgica en Córdoba" },
      {
        name: "description",
        content:
          "Historia, planta y equipo de Disseny, fábrica cordobesa de bases de sommier y mobiliario metálico para el canal mayorista.",
      },
      { property: "og:title", content: "Sobre nosotros | Disseny" },
      {
        property: "og:description",
        content: "Fábrica cordobesa de bases de sommier y mobiliario metálico.",
      },
    ],
  }),
  component: SobreNosotros,
});

function SobreNosotros() {
  return (
    <div>
      <PageHeader
        index="Plano 004"
        title="Sobre nosotros"
        lead="Placeholder: reseña institucional de Disseny, su planta en Córdoba y su enfoque en producción confiable para clientes mayoristas."
      />

      <Section label="Memoria descriptiva" title="La empresa">
        <div className="grid gap-8 lg:grid-cols-2">
          <NotePad
            title="La empresa"
            text="Placeholder: texto institucional sobre los orígenes de la empresa, su crecimiento y su especialización en bases de sommier de ecocuero y metalúrgica a medida."
            rotation={-2}
          />
          <NotePad
            title="Capacidad instalada"
            text="Placeholder: capacidad instalada, maquinaria, control de calidad y política de plazos para clientes mayoristas y licitaciones."
            rotation={2.5}
          />
        </div>
      </Section>

      <Section label="Criterios" title="Cómo trabajamos">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            ["Precisión", "Tolerancias controladas en cada serie."],
            ["Escala", "Capacidad para volúmenes sostenidos."],
            ["Cumplimiento", "Plazos y documentación en regla."],
          ].map(([titulo, detalle]) => (
            <div key={titulo} className="plate rounded-md p-6">
              <h3 className="text-lg uppercase text-signal-yellow">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detalle}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
