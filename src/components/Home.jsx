export default function Home() {
  return (
    <section className="fixed inset-0 -z-10 flex h-screen w-full flex-col items-center justify-center italic">
      <p>
        estas en el bosque y te encuentras un caramelo con envoltorio a rayas
        entre las hojas secas del piso
      </p>
      <p>~que haces?~</p>
      <ul className="flex gap-2 pt-2">
        <button className="cursor-pointer border px-2">
          me lo como sin dudar
        </button>
        <button className="cursor-pointer border px-2">salgo corriendo</button>
        <button className="cursor-pointer border px-2">sigo caminando</button>
      </ul>
    </section>
  );
}
