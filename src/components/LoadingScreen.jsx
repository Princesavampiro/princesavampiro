export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="m-8 flex items-center justify-center">
        <div className="size-4 animate-ping rounded-full border" />
      </div>
    </div>
  );
}
