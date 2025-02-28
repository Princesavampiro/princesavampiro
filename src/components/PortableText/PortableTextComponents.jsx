import parse from "html-react-parser";

export const components = {
  types: {
    embed: (props) => (
      <div className="mx-auto my-4">{parse(props.value.html)}</div>
    ),
    image: (props) => (
      <img className="mx-auto my-16 w-full max-w-4xl" src={props.value.url} />
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mx-auto w-full max-w-2xl">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="mx-auto w-full max-w-2xl text-xl sm:text-2xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-background-inverted mx-auto w-full max-w-2xl text-xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-background-inverted mx-auto w-full max-w-2xl uppercase">
        {children}
      </h3>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        className="animate-pulse hover:animate-none hover:underline"
      >
        {children}
      </a>
    ),
  },
};
