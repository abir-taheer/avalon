import Image from "next/image";
import FallbackIcon from "@/assets/icons/avatar.png";

export type OptimizedAvatarProps = {
  src?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export const OptimizedAvatar = ({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedAvatarProps) => {
  return (
    <Image
      src={src ?? FallbackIcon}
      alt={alt ?? "User Avatar"}
      width={width}
      height={height}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
      referrerPolicy={"no-referrer"}
      className={className}
    />
  );
};
