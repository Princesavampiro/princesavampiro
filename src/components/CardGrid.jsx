import { NavLink } from "react-router";

export default function CardGrid({ data, contentType }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  const getRandomTranslation = () => {
    const x = Math.random() * 0;
    const y = Math.random() * 100 - 50;
    return `translate(${x}px, ${y}px)`;
  };

  return (
    <ul className="mx-auto my-[50px] flex w-full flex-wrap items-end justify-center gap-4 p-4">
      {data.map((item) => (
        <NavLink
          to={contentType + "/" + item.slug.current}
          key={item._id}
          style={{ transform: getRandomTranslation() }}
          className={`z-0 flex max-w-[200px] flex-col items-center justify-center rounded-lg hover:z-10`}
        >
          <div className="hover:brightness-180 hover:invert hover:saturate-200">
            {!contentType.includes("release")
              ? item.imagenes && (
                  <img
                    className="rounded-sm"
                    src={item.imagenes[0].url + size.small}
                  />
                )
              : item.artwork && (
                  <img
                    className="rounded-sm"
                    src={item.artwork.url + size.small}
                  />
                )}
          </div>
          <h3 className="text-center text-sm">{item.titulo}</h3>
        </NavLink>
      ))}
    </ul>
  );
}
