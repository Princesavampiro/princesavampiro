import usePlayer from "../hooks/usePlayer";
import DraggableWindow from "./DraggableWindow";

export default function LoadToPlayerButton({ data, className }) {
  const { currentEmbed, setCurrentEmbed, setIsExpanded } = usePlayer();

  if (currentEmbed === data) return null;

  return (
    <DraggableWindow className={className}>
      <button
        className="cursor-pointer bg-yellow-300 px-4 py-2 font-[Nightingale] text-6xl text-red-500 uppercase"
        onClick={() => {
          setCurrentEmbed(data);
          setIsExpanded(true);
        }}
      >
        play
      </button>
    </DraggableWindow>
  );
}
