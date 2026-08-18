import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import StarBorder from "@/components/StarBorder";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | Disseny — Ventas mayoristas en Córdoba" },
      {
        name: "description",
        content:
          "Contactá a Disseny para pedidos mayoristas, trabajos a medida y licitaciones. Planta en Córdoba, Argentina.",
      },
      { property: "og:title", content: "Contacto | Disseny" },
      {
        property: "og:description",
        content: "Pedidos mayoristas, trabajos a medida y licitaciones.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <div>
      <PageHeader
        index="Plano 006"
        title="Contacto"
        lead="Placeholder: canal comercial para mueblerías, compradores mayoristas y organismos. El formulario definitivo se integrará en esta sección."
      />

      <Section label="Canales" title="Hablemos de tu pedido">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="plate flex min-h-80 flex-col items-center justify-center gap-6 rounded-md border-dashed p-8">
            <span className="annotation">Espacio reservado · Formulario de contacto</span>
            <StarBorder color="#F2B705" thickness={2}>
              Enviar por WhatsApp
            </StarBorder>
          </div>
          <aside className="plate rounded-md p-6">
            <dl className="space-y-5 text-sm">
              {[
                ["Ventas", "ventas@disseny.com.ar"],
                ["Teléfono", "+54 351 000 0000"],
                ["Planta", "Córdoba Capital, Argentina"],
                ["Horario", "Lunes a viernes · 8:00 a 17:00"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="annotation">{label}</dt>
                  <dd className="mt-1 text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Section>
    </div>
  );
}
