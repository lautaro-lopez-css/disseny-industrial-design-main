import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import Ticketera, { type TicketItem } from "@/components/site/Ticketera";
import QuoteStepper from "@/components/site/QuoteStepper";

export const Route = createFileRoute("/cotizador")({
  head: () => ({
    meta: [
      { title: "Cotizador | Disseny — Presupuesto por volumen" },
      {
        name: "description",
        content:
          "Armá tu pedido de bases de sommier y mobiliario metálico, sumá productos al ticket y enviá la cotización por WhatsApp.",
      },
      { property: "og:title", content: "Cotizador | Disseny" },
      {
        property: "og:description",
        content: "Armá tu ticket de pedido y enviá la cotización por WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cotizador,
});

function Cotizador() {
  const [items, setItems] = useState<TicketItem[]>([]);
  const [abierto, setAbierto] = useState(false);

  const agregar = (item: Omit<TicketItem, "id">) =>
    setItems((prev) => [
      ...prev,
      { ...item, id: `${item.producto}-${item.variante}-${Date.now()}-${prev.length}` },
    ]);

  return (
    <div>
      <PageHeader
        index="Plano 005"
        title="Cotizador"
        lead="Elegí productos del catálogo y sumalos al ticket. Cuando esté completo, enviá la cotización y completá el formulario en tres pasos."
      />

      <Section label="Módulo de pedido" title="Catálogo y ticket">
        <Ticketera
          items={items}
          onAdd={agregar}
          onRemove={(id) => setItems((prev) => prev.filter((i) => i.id !== id))}
          onSend={() => setAbierto(true)}
        />
      </Section>

      {abierto && <QuoteStepper items={items} onClose={() => setAbierto(false)} />}
    </div>
  );
}
