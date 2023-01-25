import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export type LinkButtonProps = ButtonProps & {
  href: string;
  target?: string;
};

export const LinkButton = (props: LinkButtonProps) => {
  const { href, target, ...rest } = props;

  return (
    <Link href={href} target={target} passHref>
      <Button {...rest} />
    </Link>
  );
};
