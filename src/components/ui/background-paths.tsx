import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `hsla(142, 72%, 42%, ${0.04 + i * 0.012})`,
    width: 0.5 + i * 0.04,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={path.width}
            strokeOpacity={0.5}
            fill="none"
            initial={{ pathLength: 0.3, opacity: 0.3 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.5, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({ children }: { children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathsY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const pathsScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const pathsOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.4, 0]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: pathsY, scale: pathsScale, opacity: pathsOpacity }}
      >
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
