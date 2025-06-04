import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear",
  duration,
  type: "tween",
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
});

const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  }, [spinDuration, controls, onHover, text]);

  const handleHoverStart = () => {
    if (!onHover) return;
    switch (onHover) {
      case "slowDown":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration * 2, currentRotation),
        });
        break;
      case "speedUp":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration / 4, currentRotation),
        });
        break;
      case "pause":
        controls.start({
          rotate: currentRotation,
          scale: 1,
        });
        break;
      case "goBonkers":
        controls.start({
          rotate: currentRotation + 360,
          scale: 0.8,
          transition: getTransition(spinDuration / 20, currentRotation),
        });
        break;
    }
  };

  const handleHoverEnd = () => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    });
  };

  return (
    <motion.div
      initial={{ rotate: 0 }}
      className={`relative rounded-full w-[200px] h-[200px] text-black font-bold text-center cursor-pointer ${className}`}
      animate={controls}
      onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      style={{ margin: "0 auto" }}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i;
        const radians = (rotation * Math.PI) / 180;
        const x = 80 * Math.cos(radians);
        const y = 80 * Math.sin(radians);
        const transform = `rotateZ(${rotation}deg) translate(${x}px, ${y}px)`;

        return (
          <span
            key={i}
            className="absolute inline-block text-xl"
            style={{ transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
