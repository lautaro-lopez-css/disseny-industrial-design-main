import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Plate, Section } from "@/components/site/Section";
import StarBorder from "@/components/StarBorder";
import { RevealText } from "@/components/site/RevealText";
import { NotePad } from "@/components/NotePad";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios | Disseny — Metalúrgica a medida y en cantidad" },
      {
        name: "description",
        content:
          "Bases de sommier en ecocuero, mobiliario metálico a medida, producción en serie y participación en licitaciones.",
      },
      { property: "og:title", content: "Servicios | Disseny" },
      {
        property: "og:description",
        content: "Fabricación a medida y en cantidad para mueblerías y mayoristas.",
      },
    ],
  }),
  component: Servicios,
});

const SERVICIOS: [string, string][] = [
  ["Bases de sommier en ecocuero", "SRV-01"],
  ["Mobiliario metálico a medida", "SRV-02"],
  ["Producción en serie para mayoristas", "SRV-03"],
  ["Licitaciones y pliegos", "SRV-04"],
  ["Desarrollo de prototipos", "SRV-05"],
  ["Pintura en polvo y terminaciones", "SRV-06"],
];

const PROCESO = [
  ["Relevamiento", "Definimos medidas, materiales y volumen."],
  ["Plano y muestra", "Documentación técnica y prototipo aprobado."],
  ["Producción", "Corte, soldadura, tapizado y terminación."],
  ["Entrega", "Control de calidad y logística acordada."],
];

function Servicios() {
  return (
    <div>
      <PageHeader
        index="Plano 003"
        title="Servicios"
        lead="Placeholder: descripción de las líneas de producción de Disseny, desde piezas unitarias hasta series completas para el canal mayorista."
      />

      <Section label="Líneas de trabajo" title="Qué fabricamos">
        <RevealText className="max-w-4xl">
          Placeholder: descripción extensa de las líneas de fabricación, materiales disponibles,
          tolerancias de producción y capacidad de la planta para resolver series completas o
          desarrollos puntuales según plano del cliente.
        </RevealText>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <NotePad
            title="Bases de sommier en ecocuero"
            text="Placeholder: descripción técnica del servicio de bases de sommier en ecocuero, materiales disponibles, cantidades mínimas y plazos de entrega estimados."
            rotation={-2}
          />
          <NotePad
            title="Mobiliario metálico a medida"
            text="Placeholder: descripción técnica del servicio de metalúrgica a medida para muebles, sillas, mesas y estanterías, con tolerancias de producción y acabados disponibles."
            rotation={2}
          />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.slice(2).map(([titulo, code]) => (
            <Plate key={code} title={titulo} code={code}>
              Placeholder: alcance del servicio, materiales disponibles, cantidades mínimas y plazos
              de entrega estimados.
            </Plate>
          ))}
        </div>
      </Section>

      <Section label="Procedimiento" title="Cómo trabajamos">
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map(([titulo, detalle], i) => (
            <li key={titulo} className="border-t-2 border-accent pt-5">
              <span className="annotation text-accent">Etapa 0{i + 1}</span>
              <h3 className="mt-2 text-lg uppercase">{titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{detalle}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <StarBorder as={Link} to="/cotizador" color="#F2B705" thickness={2}>
            Solicitar cotización para licitación
          </StarBorder>
          <StarBorder as="span" color="#D7263D" thickness={2} speed="4s">
            Aplica precio mayorista
          </StarBorder>
        </div>
      </Section>
    </div>
  );
}
