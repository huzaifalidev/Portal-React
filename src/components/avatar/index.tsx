type Props = {
  src: string;
  alt: string;
};

export default function UserAvatar({ src, alt }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover border"
    />
  );
}
