import { useEffect, useState, type ReactNode } from "react";
import { MotionConfig, motion } from "motion/react";
import { shouldPlayEntrance } from "./entrance-policy";

const poses = ["waving", "cheerful", "curious"];

export default function Entrance({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!shouldPlayEntrance(matchMedia("(prefers-reduced-motion: reduce)").matches, location.hash)) return;
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const finish = () => setPlaying(false);
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => { if (preference.matches) finish(); };
    const timeout = window.setTimeout(finish, 3600);
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    window.addEventListener("wheel", finish, { passive: true });
    window.addEventListener("touchstart", finish, { passive: true });
    window.addEventListener("hashchange", finish);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("hashchange", finish);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [playing]);

  return (
    <MotionConfig reducedMotion="user">
      {playing && (
        <div className="entrance-layer">
          <motion.div
            className="entrance-curtain"
            aria-hidden="true"
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"] }}
            transition={{ duration: 3.1, times: [0, 0.76, 1], ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setPlaying(false)}
          >
            <p className="entrance-kicker">A little space for your next idea.</p>
            <div className="entrance-wordmark">
              <span className="entrance-letter-mask">{["f", "i", "l", "o"].map((letter, index) => <motion.span key={letter} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>{letter}</motion.span>)}</span>
              <motion.span className="entrance-mascots" initial={{ width: "0vw" }} animate={{ width: ["0vw", "22vw", "22vw", "0vw"] }} transition={{ duration: 2.5, times: [0, 0.28, 0.8, 1], ease: [0.76, 0, 0.24, 1] }}>
                {poses.map((pose, index) => <motion.img key={pose} src={`/assets/mascots/entry/${pose}.png`} width="1254" height="1254" alt="" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.85], rotate: [-8, 6, 6, 0] }} transition={{ duration: 0.85, delay: 0.5 + index * 0.55, times: [0, 0.15, 0.8, 1] }} />)}
              </motion.span>
            </div>
            <motion.p className="entrance-tagline" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>Learning, together.</motion.p>
          </motion.div>
        </div>
      )}
      <motion.div initial={false} animate={{ y: playing ? 16 : 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}
