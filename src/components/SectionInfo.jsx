import { PortableText } from "@portabletext/react";
import SectionTitle from "./SectionTitle";
import { components } from "./PortableText/PortableTextComponents";

export default function SectionInfo({ title, text }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <SectionTitle title={title} />
      {text && (
        <div className="flex flex-col gap-4">
          <PortableText components={components} value={text} />
        </div>
      )}
    </div>
  );
}
