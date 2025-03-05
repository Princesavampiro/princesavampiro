import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function EmbedRenderer({ value }) {
  const config = {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  };
  let result;
  if (value.includes('src="https://bandcamp.com/EmbeddedPlayer')) {
    result = parse(value);
  } else {
    const cleanValue = DOMPurify.sanitize(value, config);
    result = parse(cleanValue);
  }
  return <>{result}</>;
}
