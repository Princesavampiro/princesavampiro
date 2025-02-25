export default function ItemContainer({ children }) {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-[#0000022] backdrop-blur-sm">
      <div className="h-3/4">{children}</div>
    </section>
  );
}
