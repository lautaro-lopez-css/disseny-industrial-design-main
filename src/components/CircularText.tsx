import { useEffect } from "react";
import { motion, useAnimation, useMotionValue, type Transition } from "motion/react";
import "./CircularText.css";

type OnHover = "slowDown" | "speedUp" | "pause" | "goBonkers";

const getRotationTransition = (duration: number, from: number, loop = true) =>
  ({
    from,
    to: from + 360,
    ease: "linear",
    duration,
    type: "tween",
    repeat: loop ? Infinity : 0,
  }) as const;

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: { type: "spring", damping: 20, stiffness: 300 },
});

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  onHover?: OnHover | null;
  className?: string;
  size?: number;
  fontSize?: number;
};

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  size = 200,
  fontSize = 14,
}: CircularTextProps) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start) as Transition,
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;
    let transitionConfig: Transition;
    let scaleVal = 1;

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start) as Transition;
        break;
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start) as Transition;
        break;
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        };
        break;
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start) as Transition;
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start) as Transition;
    }

    controls.start({ rotate: start + 360, scale: scaleVal, transition: transitionConfig });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start) as Transition,
    });
  };

  return (
    <motion.div
      className={`circular-text ${className}`}
      style={{ rotate: rotation, width: size, height: size, fontSize }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const radius = size / 2 - fontSize * 0.9;
        const transform = `translate(-50%, -50%) rotateZ(${rotationDeg}deg) translateY(-${radius}px)`;

        return (
          <span
            key={i}
            style={{ transform, WebkitTransform: transform, fontSize: `${fontSize}px` }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
