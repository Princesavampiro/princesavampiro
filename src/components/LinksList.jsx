export default function LinksList({ links }) {
  return (
    <ul>
      <h3 className="underline">Links:</h3>
      {links.map((link) => (
        <li key={link._key}>
          <a href={link.url} target="_blank">
            {link.titulo}
          </a>
        </li>
      ))}
    </ul>
  );
}
