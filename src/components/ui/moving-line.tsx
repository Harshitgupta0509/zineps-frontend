"use client";

import { motion, useReducedMotion } from "motion/react";

export default function MovingLine({ delay = 0 }: { delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="moving-line-signal"
      animate={
        reduceMotion
          ? { transform: "translate(-100%, -50%)", opacity: 0 }
          : {
              transform: ["translate(-100%, -50%)", "translate(800%, -50%)"],
              opacity: [0, 1, 1, 0],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 3.2,
              ease: "linear",
              repeat: Infinity,
              delay,
            }
      }
    />
  );
}
