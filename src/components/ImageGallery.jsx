export default function ImageGallery({ images }) {
  const size = {
    small: "?h=500&fm=webp",
    large: "?h=1080&fm=webp",
  };

  return (
    <ul className="flex flex-wrap gap-4">
      {images.map((img) => (
        <li key={img._key} className="w-[200px]">
          <img src={img.url + size.small} />
        </li>
      ))}
    </ul>
  );
}
