import { Link } from "@tanstack/react-router";
import CircularText from "../CircularText";
import StickerPeel from "../StickerPeel";
import stickerD from "../../assets/sticker-d.png";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-4">
      <span className="relative flex size-[180px] shrink-0 items-center justify-center">
        <span className="absolute inset-0 text-primary">
          <CircularText
            text="DISSENY · DISEÑO Y CALIDAD · "
            spinDuration={20}
            onHover="speedUp"
            size={180}
            fontSize={13}
            className="font-technical tracking-[0.1em] text-primary"
          />
        </span>
        <span className="relative z-10 block size-[130px]">
          <StickerPeel
            imageSrc={stickerD}
            width={130}
            rotate={0}
            peelDirection={0}
            peelBackHoverPct={19}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
          />
        </span>
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-[0.18em] text-foreground">
          DISSENY
        </span>
        <span className="annotation block">Metalúrgica · Córdoba</span>
      </span>
    </Link>
  );
}
