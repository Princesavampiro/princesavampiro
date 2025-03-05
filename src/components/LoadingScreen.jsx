export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="m-8 flex items-center justify-center">
        <div className="animate-spin text-2xl">✴</div>
      </div>
    </div>
  );
}
