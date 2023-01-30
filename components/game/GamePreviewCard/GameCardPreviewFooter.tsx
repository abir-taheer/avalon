import { LinkButton } from "@/components/button/LinkButton";
import { ArrowForward } from "@mui/icons-material";
import { Stack } from "@mui/material";

export type GameCardPreviewFooterProps = {
  id: string;
};

export const GameCardPreviewFooter = ({ id }: GameCardPreviewFooterProps) => {
  return (
    <Stack
      direction={"row"}
      alignContent={"space-between"}
      justifyContent={"space-between"}
    >
      <LinkButton
        variant={"outlined"}
        href={"/game/" + id}
        endIcon={<ArrowForward />}
      >
        Go To Game
      </LinkButton>
    </Stack>
  );
};
