import DraggableWindow from "./DraggableWindow";

export default function SectionContent({ windowTitle, children, className }) {
  if (!children) return null;
  return (
    <DraggableWindow
      title={windowTitle}
      className={`h-auto max-h-[60vh] w-1/2 lg:w-1/3 ${className}`}
    >
      {children}
    </DraggableWindow>
  );
}
