export default function CardGrid({ data, release = false }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  const getRandomTranslation = () => {
    const x = Math.random() * 0;
    const y = Math.random() * 200 - 100;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <ul className="mx-auto my-[50px] flex w-full flex-wrap items-end justify-center gap-4 px-64">
      {data.map((item) => (
        <li
          key={item._id}
          style={{ transform: getRandomTranslation() }}
          className={`z-0 flex max-w-[200px] flex-col items-center justify-center rounded-lg hover:z-10`}
        >
          <div className="hover:brightness-180 hover:invert hover:saturate-200">
            {!release
              ? item.imagenes && (
                  <img
                    className="rounded-full"
                    src={item.imagenes[0].url + size.small}
                  />
                )
              : item.artwork && (
                  <img
                    className="rounded-full"
                    src={item.artwork.url + size.small}
                  />
                )}
          </div>
          <h3 className="text-center text-sm">{item.titulo}</h3>
        </li>
      ))}
    </ul>
  );
}
