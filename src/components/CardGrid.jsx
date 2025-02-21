export default function CardGrid({ data, release = false }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };
  return (
    <ul className="mx-auto grid w-3/4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 lg:w-2/4">
      {data.map((item) => (
        <li
          key={item._id}
          className="flex flex-col items-center justify-center"
        >
          {!release
            ? item.imagenes && <img src={item.imagenes[0].url + size.small} />
            : item.artwork && <img src={item.artwork.url + size.small} />}
          <h3 className="text-center text-sm">{item.titulo}</h3>
        </li>
      ))}
    </ul>
  );
}
