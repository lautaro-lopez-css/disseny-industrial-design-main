import type { CSSProperties, ElementType, ReactNode } from "react";

import "./StarBorder.css";

type StarBorderProps = {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
};

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "#F2B705",
  speed = "4s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={
        {
          padding: `${thickness}px 0`,
          "--star-accent": color,
          "--star-speed-hover": "1.4s",
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
