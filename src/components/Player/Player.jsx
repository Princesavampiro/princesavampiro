import { useConfig } from "../../hooks/useData";
import { motion, useDragControls } from "motion/react";

export default function Player() {
  const { data } = useConfig();
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={controls}
      whileDrag={{ scale: 0.9 }}
      dragMomentum={false}
      className="fixed bottom-8 left-8 flex w-max items-center gap-2 select-none"
    >
      {data[0].audio && (
        <audio
          controls
          src={data[0].audio.archivo?.asset.url || data[0].audio.url}
          className="rounded-full"
        />
      )}
      <div
        onPointerDown={(event) => controls.start(event)}
        className="animate-spin cursor-grab hover:animate-none"
      >
        ✴
      </div>
    </motion.div>
  );
}
