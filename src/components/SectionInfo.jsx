import { PortableText } from "@portabletext/react";
import SectionTitle from "./SectionTitle";
import { components } from "./PortableText/PortableTextComponents";
import DraggableWindow from "./DraggableWindow";

export default function SectionInfo({ title, text }) {
  return (
    <div className="flex flex-col gap-4">
      {text && (
        <DraggableWindow>
          <SectionTitle title={title} />
          <div className="flex flex-col gap-4">
            <PortableText components={components} value={text} />
          </div>
        </DraggableWindow>
      )}
    </div>
  );
}
