import { useEffect, useState } from "react";
import "./NotePad.css";

export interface NotePadProps {
  title: string;
  text: string;
  image?: string;
  rotation?: number;
  className?: string;
}

export function NotePad({ title, text, image, rotation, className = "" }: NotePadProps) {
  const [randomRotation, setRandomRotation] = useState(0);

  useEffect(() => {
    if (rotation === undefined) {
      setRandomRotation(Math.random() * 6 - 3);
    }
  }, [rotation]);

  const finalRotation = rotation ?? randomRotation;

  return (
    <article
      className={`notepad ${className}`}
      style={{ "--notepad-rotation": `${finalRotation}deg` } as React.CSSProperties}
    >
      <div className="notepad-binding" aria-hidden="true" />
      <div className="notepad-perforation" aria-hidden="true" />
      <div className="notepad-content">
        <h3 className="notepad-title">{title}</h3>
        {image && (
          <div className="notepad-image">
            <img src={image} alt={title} loading="lazy" />
          </div>
        )}
        <p className="notepad-text">{text}</p>
      </div>
    </article>
  );
}
