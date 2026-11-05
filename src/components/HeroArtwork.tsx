import { MotionConfig, motion } from "motion/react";

export default function HeroArtwork() {
  return (
    <MotionConfig reducedMotion="user">
      <figure className="hero-artwork">
        <div className="artwork-orbit" aria-hidden="true" />
        <span className="artwork-spark spark-one" aria-hidden="true">✳</span>
        <span className="artwork-spark spark-two" aria-hidden="true">✧</span>
        <motion.div
          className="mascot-frame"
          initial={false}
          animate={{ y: [0, -12, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          whileHover={{ rotate: -3, transition: { duration: 0.25 } }}
        >
          <img src="/assets/mascots/entry/waving.png" width="1254" height="1254" alt="" fetchPriority="high" />
        </motion.div>
        <div className="artwork-note note-top" aria-hidden="true">
          <span className="note-icon">↗</span>
          <div><strong>A little more curious.</strong><span>A little more connected.</span></div>
        </div>
        <div className="artwork-note note-bottom" aria-hidden="true">
          <span className="note-icon">✓</span>
          <div><strong>Room for your next idea.</strong><span>That’s the Filo feeling.</span></div>
        </div>
        <figcaption className="artwork-caption">Your learning has a little company.</figcaption>
      </figure>
    </MotionConfig>
  );
}
