import Image from "next/image";
import FallbackIcon from "@/assets/icons/avatar.png";
import { makeStyles } from "tss-react/mui";
import classNames from "classnames";

export type OptimizedAvatarProps = {
  src?: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

const useStyles = makeStyles()((theme) => ({
  Avatar: {
    borderRadius: "50%",
    objectFit: "cover",
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

export const OptimizedAvatar = ({
  src,
  alt,
  width,
  height,
  className,
}: OptimizedAvatarProps) => {
  const { classes } = useStyles();

  return (
    <Image
      src={src ?? FallbackIcon}
      alt={alt ?? "User Avatar"}
      width={width}
      height={height}
      className={classNames(classes.Avatar, className)}
      referrerPolicy={"no-referrer"}
    />
  );
};
