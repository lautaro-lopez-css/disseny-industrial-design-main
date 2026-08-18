import { useState } from "react";
import { z } from "zod";

import Stepper, { Step } from "@/components/Stepper";
import StarBorder from "@/components/StarBorder";

import type { TicketItem } from "@/components/site/Ticketera";

const WHATSAPP_NUMBER = "5493510000000";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresá tu nombre").max(80),
  whatsapp: z
    .string()
    .trim()
    .min(6, "Ingresá un WhatsApp válido")
    .max(25)
    .regex(/^[0-9+()\s-]+$/, "Solo números y símbolos telefónicos"),
  email: z.string().trim().email("Email inválido").max(120),
  ciudad: z.string().trim().min(2, "Ingresá tu ciudad").max(80),
});

const clientSchema = z.object({
  tipo: z.enum(["Mueblería", "Particular", "Otro"]),
  detalle: z.string().trim().max(300).optional(),
});

const FIELD =
  "mt-1 w-full rounded-sm border border-blueprint/40 bg-white/70 px-3 py-2 text-sm text-blueprint-deep outline-none transition-colors focus:border-blueprint";

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="font-technical text-[0.62rem] uppercase tracking-[0.22em] text-blueprint-deep/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength ?? 120}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD}
        style={{ color: "#16233d" }}
      />
      {error && <span className="mt-1 block text-[0.68rem] text-signal-red">{error}</span>}
    </label>
  );
}

export default function QuoteStepper({
  items,
  onClose,
}: {
  items: TicketItem[];
  onClose: () => void;
}) {
  const [contacto, setContacto] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    ciudad: "",
  });
  const [tipo, setTipo] = useState<"Mueblería" | "Particular" | "Otro">("Mueblería");
  const [detalle, setDetalle] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const validateStep = (step: number) => {
    const schema = step === 1 ? contactSchema : clientSchema;
    const data = step === 1 ? contacto : { tipo, detalle };
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  };

  const buildWhatsAppLink = () => {
    const mensaje = [
      "*Solicitud de cotización — Disseny*",
      "",
      `Nombre: ${contacto.nombre}`,
      `WhatsApp: ${contacto.whatsapp}`,
      `Email: ${contacto.email}`,
      `Ciudad: ${contacto.ciudad}`,
      `Tipo de cliente: ${tipo}`,
      detalle ? `Pedido en cantidad / licitación: ${detalle}` : null,
      "",
      "*Pedido*",
      ...items.map(
        (item, i) =>
          `${String(i + 1).padStart(2, "0")}. ${item.producto} — ${item.variante} — x${item.cantidad}`,
      ),
      `Total de unidades: ${items.reduce((acc, i) => acc + i.cantidad, 0)}`,
      items.reduce((acc, i) => acc + i.cantidad, 0) > 30 ? "Aplica precio mayorista" : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  };

  const enviarWhatsApp = () => {
    if (!validateStep(1) || !validateStep(2)) return;
    window.open(buildWhatsAppLink(), "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-blueprint-deep/80 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Formulario de cotización"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[34rem]">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-1 right-0 z-10 font-technical text-xs uppercase tracking-[0.2em] text-signal-yellow"
        >
          Cerrar ✕
        </button>

        <Stepper
          className="mt-8"
          backButtonText="Atrás"
          nextButtonText="Continuar"
          disableStepIndicators
          onStepChange={() => setErrors({})}
          validateStep={validateStep}
          renderCompleteButton={() => (
            <StarBorder
              as="button"
              type="button"
              color="#F2B705"
              thickness={2}
              onClick={enviarWhatsApp}
            >
              {enviado ? "Reenviar por WhatsApp" : "Enviar por WhatsApp"}
            </StarBorder>
          )}
        >
          <Step>
            <StepHead index="01" title="Datos de contacto" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre y apellido"
                value={contacto.nombre}
                onChange={(v) => setContacto({ ...contacto, nombre: v })}
                {...(errors["nombre"] ? { error: errors["nombre"] } : {})}
              />
              <Field
                label="WhatsApp"
                value={contacto.whatsapp}
                placeholder="+54 351 000 0000"
                onChange={(v) => setContacto({ ...contacto, whatsapp: v })}
                {...(errors["whatsapp"] ? { error: errors["whatsapp"] } : {})}
              />
              <Field
                label="Email"
                type="email"
                value={contacto.email}
                onChange={(v) => setContacto({ ...contacto, email: v })}
                {...(errors["email"] ? { error: errors["email"] } : {})}
              />
              <Field
                label="Ciudad"
                value={contacto.ciudad}
                onChange={(v) => setContacto({ ...contacto, ciudad: v })}
                {...(errors["ciudad"] ? { error: errors["ciudad"] } : {})}
              />
            </div>
          </Step>

          <Step>
            <StepHead index="02" title="Tipo de cliente" />
            <div className="flex flex-wrap gap-2">
              {(["Mueblería", "Particular", "Otro"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTipo(option)}
                  className="rounded-sm border px-4 py-2 font-technical text-[0.68rem] uppercase tracking-[0.18em] transition-colors"
                  style={
                    tipo === option
                      ? {
                          background: "oklch(0.26 0.075 256)",
                          color: "#F2B705",
                          borderColor: "oklch(0.2 0.06 256)",
                        }
                      : { color: "#3a4a68", borderColor: "rgba(58,74,104,0.35)" }
                  }
                >
                  {option}
                </button>
              ))}
            </div>
            <label className="mt-5 block">
              <span className="font-technical text-[0.62rem] uppercase tracking-[0.22em] text-blueprint-deep/70">
                Pedido en cantidad o licitación (opcional)
              </span>
              <textarea
                value={detalle}
                maxLength={300}
                rows={3}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Ej.: 120 bases para licitación municipal, entrega en 60 días."
                className={FIELD}
                style={{ color: "#16233d" }}
              />
            </label>
            {errors["detalle"] && (
              <span className="mt-1 block text-[0.68rem] text-signal-red">{errors["detalle"]}</span>
            )}
          </Step>

          <Step>
            <StepHead index="03" title="Resumen del pedido" />
            <dl className="space-y-2 text-sm" style={{ color: "#16233d" }}>
              {[
                ...items.map(
                  (item, i) =>
                    [
                      `${String(i + 1).padStart(2, "0")} ${item.producto}`,
                      `${item.variante} · x${item.cantidad}`,
                    ] as [string, string],
                ),
                ["Total de unidades", String(items.reduce((acc, i) => acc + i.cantidad, 0))],
                ["Cliente", `${contacto.nombre || "—"} · ${tipo}`],
                ["Contacto", `${contacto.whatsapp || "—"} · ${contacto.ciudad || "—"}`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-6 border-b border-dashed border-blueprint/30 pb-1"
                >
                  <dt className="font-technical text-[0.62rem] uppercase tracking-[0.2em] opacity-70">
                    {label}
                  </dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
              {detalle && <p className="pt-1 text-xs opacity-80">Nota: {detalle}</p>}
            </dl>
            {enviado && (
              <p className="mt-4 font-technical text-[0.68rem] uppercase tracking-[0.18em] text-signal-red">
                Mensaje abierto en WhatsApp
              </p>
            )}
          </Step>
        </Stepper>
      </div>
    </div>
  );
}

function StepHead({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="font-technical text-[0.6rem] uppercase tracking-[0.3em] text-signal-red">
        Paso {index}
      </p>
      <h3 className="mt-1 font-display text-xl uppercase" style={{ color: "#16233d" }}>
        {title}
      </h3>
    </div>
  );
}
