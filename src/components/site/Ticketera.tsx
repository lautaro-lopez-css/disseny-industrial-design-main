import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import StarBorder from "@/components/StarBorder";
import { Reveal } from "@/components/site/Reveal";
import prodSommier from "@/assets/prod-sommier.jpg";
import prodRespaldo from "@/assets/prod-respaldo.jpg";
import prodSilla from "@/assets/prod-silla.jpg";
import prodMesa from "@/assets/prod-mesa.jpg";
import prodEstanteria from "@/assets/prod-estanteria.jpg";

export type TicketItem = {
  id: string;
  producto: string;
  cantidad: number;
  variante: string;
};

type Producto = {
  id: string;
  nombre: string;
  imagen: string;
  medidaLabel: string;
  medidas: string[];
  colorLabel: string;
  colores: string[];
};

const CATALOGO: Record<"sommiers" | "metalurgica", Producto[]> = {
  sommiers: [
    {
      id: "base-sommier",
      nombre: "Base de sommier ecocuero",
      imagen: prodSommier,
      medidaLabel: "Medida",
      medidas: ["1 plaza", "2 plazas", "Queen", "King"],
      colorLabel: "Color",
      colores: ["Negro", "Marrón", "Texturado"],
    },
    {
      id: "respaldo",
      nombre: "Respaldo capitoné",
      imagen: prodRespaldo,
      medidaLabel: "Modelo",
      medidas: ["Capitoné", "Liso", "A medida"],
      colorLabel: "Color",
      colores: ["Marrón", "Negro", "Gris"],
    },
  ],
  metalurgica: [
    {
      id: "silla",
      nombre: "Silla apilable caño",
      imagen: prodSilla,
      medidaLabel: "Modelo",
      medidas: ["Estándar", "Apilable reforzada"],
      colorLabel: "Terminación",
      colores: ["Negro texturado", "Gris grafito", "Cromado", "Blanco"],
    },
    {
      id: "mesa",
      nombre: "Mesa estructura metálica",
      imagen: prodMesa,
      medidaLabel: "Medida",
      medidas: ["1,20 m", "1,60 m", "1,40 m", "A medida"],
      colorLabel: "Tapa",
      colores: ["Madera", "Melamina"],
    },
    {
      id: "estanteria",
      nombre: "Estantería ángulo ranurado",
      imagen: prodEstanteria,
      medidaLabel: "Altura / estantes",
      medidas: ["1,80 m · 4 estantes", "2,00 m · 5 estantes", "2,40 m · 6 estantes"],
      colorLabel: "Terminación",
      colores: ["Estándar", "Pintura antióxido"],
    },
  ],
};

const SELECT =
  "mt-1 w-full rounded-sm border border-border bg-blueprint-deep/60 px-2 py-1.5 font-technical text-[0.7rem] uppercase tracking-[0.08em] text-foreground outline-none focus:border-signal-yellow";

function ProductCard({
  producto,
  onAdd,
}: {
  producto: Producto;
  onAdd: (item: Omit<TicketItem, "id">) => void;
}) {
  const [cantidad, setCantidad] = useState(1);
  const [medida, setMedida] = useState(producto.medidas[0]!);
  const [color, setColor] = useState(producto.colores[0]!);

  return (
    <article className="plate flex flex-col rounded-md p-4">
      <div className="overflow-hidden rounded-sm border border-border/70">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          loading="lazy"
          width={768}
          height={576}
          className="h-32 w-full object-cover"
        />
      </div>
      <h4 className="mt-3 font-technical text-sm uppercase tracking-[0.08em]">{producto.nombre}</h4>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block">
          <span className="annotation">{producto.medidaLabel}</span>
          <select className={SELECT} value={medida} onChange={(e) => setMedida(e.target.value)}>
            {producto.medidas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="annotation">{producto.colorLabel}</span>
          <select className={SELECT} value={color} onChange={(e) => setColor(e.target.value)}>
            {producto.colores.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-3 block">
        <span className="annotation">Cantidad</span>
        <input
          type="number"
          min={1}
          max={999}
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
          className={SELECT}
        />
      </label>

      <StarBorder
        color="#F2B705"
        thickness={2}
        className="mt-4 w-full"
        onClick={() =>
          onAdd({ producto: producto.nombre, cantidad, variante: `${medida} · ${color}` })
        }
      >
        Agregar
      </StarBorder>
    </article>
  );
}

const PLANE_PATH = "M2 12.5 22 3 14.8 22l-3.1-6.9L2 12.5Zm9.7 2.6L22 3";

export default function Ticketera({
  items,
  onAdd,
  onRemove,
  onSend,
}: {
  items: TicketItem[];
  onAdd: (item: Omit<TicketItem, "id">) => void;
  onRemove: (id: string) => void;
  onSend: () => void;
}) {
  const [tab, setTab] = useState<"sommiers" | "metalurgica">("sommiers");
  const [phase, setPhase] = useState<"idle" | "cutting" | "flying">("idle");

  const total = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);
  const mayorista = total > 30;

  const enviar = () => {
    if (!items.length || phase !== "idle") return;
    setPhase("cutting");
    window.setTimeout(() => setPhase("flying"), 550);
    window.setTimeout(() => {
      setPhase("idle");
      onSend();
    }, 1650);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      {/* Catálogo */}
      <div>
        <div className="flex gap-2">
          {(
            [
              ["sommiers", "Sommiers"],
              ["metalurgica", "Metalúrgica"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-sm border px-4 py-2 font-technical text-[0.68rem] uppercase tracking-[0.18em] transition-colors ${
                tab === key
                  ? "border-signal-yellow bg-signal-yellow/15 text-signal-yellow"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {CATALOGO[tab].map((producto, i) => (
            <Reveal key={producto.id} delay={i * 80}>
              <ProductCard producto={producto} onAdd={onAdd} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Ticketera — solo el papel, sin carcasa de máquina */}
      <aside className="relative">
        <div className="sticky top-24">
          <div className="relative mx-auto w-full max-w-[20rem]">
            {/* Ranura de salida: sugiere de dónde "sale" el papel, sin dibujar la máquina completa */}
            <div className="relative z-20 mx-auto h-3 w-[92%] rounded-t-sm bg-[oklch(0.2_0.03_256)] shadow-[0_-2px_6px_rgba(0,0,0,0.35)_inset,0_4px_10px_rgba(0,0,0,0.4)]">
              <div className="mx-auto mt-1 h-[2px] w-[70%] bg-black/50" />
            </div>

            {/* Papel */}
            <div className="relative z-10 flex justify-center">
              <motion.div
                layout
                className="ticket-paper w-full origin-top"
                animate={
                  phase === "cutting"
                    ? { y: 8 }
                    : phase === "flying"
                      ? { opacity: 0, scale: 0.7, y: -10 }
                      : { y: 0, opacity: 1, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
              >
                <div className="px-4 pb-6 pt-6">
                  <p className="text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-neutral-600">
                    Disseny · Córdoba
                  </p>
                  <p className="mt-1 text-center font-mono text-[0.6rem] text-neutral-500">
                    Detalle de cotización — sin importes
                  </p>
                  <div className="my-3 border-t border-dashed border-neutral-400" />

                  {items.length === 0 && (
                    <p className="py-4 text-center font-mono text-[0.65rem] text-neutral-500">
                      -- sin ítems cargados --
                    </p>
                  )}

                  <AnimatePresence initial={false}>
                    {items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-2 py-1 font-mono text-[0.68rem] leading-snug text-neutral-700">
                          <span className="flex-1">
                            {String(i + 1).padStart(2, "0")} {item.producto.toUpperCase()}
                            <br />
                            <span className="text-neutral-500">{item.variante}</span>
                          </span>
                          <span className="whitespace-nowrap">x{item.cantidad}</span>
                          <button
                            type="button"
                            onClick={() => onRemove(item.id)}
                            aria-label={`Quitar ${item.producto}`}
                            className="text-neutral-400 transition-colors hover:text-[#D7263D]"
                          >
                            ✕
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="my-3 border-t border-dashed border-neutral-400" />
                  <p className="flex justify-between font-mono text-[0.7rem] font-bold text-neutral-800">
                    <span>TOTAL UNIDADES</span>
                    <span>{total}</span>
                  </p>

                  {mayorista && (
                    <motion.p
                      initial={{ opacity: 0, scale: 1.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mx-auto mt-4 w-fit -rotate-[15deg] rounded-sm border-[3px] border-[#D7263D] px-3 py-1 font-technical text-[0.7rem] uppercase tracking-[0.18em] text-[#D7263D]"
                    >
                      Aplica precio mayorista
                    </motion.p>
                  )}

                  <div className="mt-5 h-3 w-full bg-[repeating-linear-gradient(135deg,transparent_0_6px,rgba(0,0,0,0.12)_6px_12px)]" />
                </div>
              </motion.div>

              {/* Línea de corte */}
              <AnimatePresence>
                {phase === "cutting" && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="pointer-events-none absolute left-[6%] right-[6%] top-10 z-30 h-[2px] origin-left bg-[#D7263D]"
                  />
                )}
              </AnimatePresence>

              {/* Avión de papel */}
              <AnimatePresence>
                {phase === "flying" && (
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F2B705"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.6, rotate: -10 }}
                    animate={{ opacity: [0, 1, 1, 0], x: 140, y: 180, scale: 1, rotate: 15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="pointer-events-none absolute left-1/2 top-10 z-40 h-10 w-10"
                  >
                    <path d={PLANE_PATH} />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <StarBorder
              color="#F2B705"
              thickness={2}
              className="w-full"
              onClick={enviar}
              disabled={!items.length || phase !== "idle"}
              style={{ opacity: items.length ? 1 : 0.5 }}
            >
              {phase === "idle" ? "Enviar cotización" : "Cortando ticket…"}
            </StarBorder>
            {mayorista && (
              <StarBorder as="span" color="#D7263D" thickness={2} speed="4s" className="w-full">
                Aplica precio mayorista
              </StarBorder>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
