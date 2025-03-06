import { NavLink } from "react-router";
import { useLocation } from "react-router";

export default function CardGrid({ data, contentType }) {
  const location = useLocation(); // Get current path
  const currentPath = location.pathname.split("/")[1];

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
    <ul className="mx-auto flex w-full flex-wrap items-end justify-center gap-8 pt-8">
      {data.map((item) => (
        <NavLink
          to={currentPath + "/" + item.slug.current}
          key={item._id}
          style={{ transform: getRandomTranslation() }}
          className={`z-0 flex max-w-[150px] flex-col items-center justify-center rounded-lg py-4 hover:z-10`}
        >
          {(item.imagenes?.[0].url || item.artwork) && (
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
          )}
          <h3 className="text-center text-sm hover:underline">{item.titulo}</h3>
          {item.lugar && (
            <p className="text-center text-xs">
              {item.lugar}
              {item.fecha ? ` [${item.fecha.slice(0, 4)}]` : ""}
            </p>
          )}
          {item.sello && (
            <p className="text-center text-xs">
              {item.sello}
              {item.fecha ? ` [${item.fecha.slice(0, 4)}]` : ""}
            </p>
          )}
        </NavLink>
      ))}
    </ul>
  );
}
