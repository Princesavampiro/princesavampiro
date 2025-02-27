import DraggableWindow from "./DraggableWindow";

export default function SectionContent({ windowTitle, children }) {
  if (!children) return null;
  return (
    <DraggableWindow title={windowTitle} className={"max-h-[60vh] w-full"}>
      {children}
    </DraggableWindow>
  );
}
