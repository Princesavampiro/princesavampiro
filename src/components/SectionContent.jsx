import DraggableWindow from "./DraggableWindow";

export default function SectionContent({ windowTitle, children }) {
  if (!children) return null;
  return (
    <DraggableWindow
      title={windowTitle}
      className={"fixed top-1/5 right-16 h-auto max-h-[60vh] w-1/2 lg:w-1/3"}
    >
      {children}
    </DraggableWindow>
  );
}
