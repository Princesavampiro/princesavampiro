export default function Loading() {
  return (
    <div className="user-select-none pointer-events-none m-8 flex items-center justify-center">
      <div className="animate-spin text-2xl">
        <img src="/img/star.svg" alt="star" className="w-4 invert" />
      </div>
    </div>
  );
}
