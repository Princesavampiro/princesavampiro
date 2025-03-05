import DraggableWindow from "./DraggableWindow";

export default function SectionContent({ windowTitle, children, className }) {
  if (!children) return null;
  return (
    <DraggableWindow
      title={windowTitle}
      className={`h-auto w-1/2 sm:max-h-[60vh] lg:w-1/3 ${className}`}
    >
      {children}
    </DraggableWindow>
  );
}
