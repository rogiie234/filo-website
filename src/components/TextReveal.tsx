import { MotionConfig, motion } from "motion/react";

interface Props {
  id?: string;
  lines: string[];
  as?: "h2" | "h3";
}

export default function TextReveal({ id, lines, as: Tag = "h2" }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <Tag id={id} className="text-reveal" aria-label={lines.join(" ")}>
        {lines.map((line, index) => (
          <span className="text-line-mask" aria-hidden="true" key={line}>
            <motion.span
              className="text-line"
              initial={false}
              whileInView={{ y: [28, 0], opacity: [0.25, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    </MotionConfig>
  );
}
