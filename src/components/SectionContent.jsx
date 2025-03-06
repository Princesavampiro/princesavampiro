import DraggableWindow from "./DraggableWindow";

export default function SectionContent({ windowTitle, children, className }) {
  if (!children) return null;
  return (
    <DraggableWindow
      title={windowTitle}
      className={`h-max w-full max-w-prose sm:max-h-[60vh] ${className}`}
    >
      {children}
    </DraggableWindow>
  );
}
