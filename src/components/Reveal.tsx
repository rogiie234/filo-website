import type { ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={false}
        whileInView={{ opacity: [0.45, 1], y: [24, 0] }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
