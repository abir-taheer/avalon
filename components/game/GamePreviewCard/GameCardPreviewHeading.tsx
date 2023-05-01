import { useIsMobile } from "@/hooks/ui";
import { LinkOutlined } from "@mui/icons-material";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import Link from "next/link";
import { useSnackbar } from "notistack";

export type GameCardPreviewHeadingProps = {
  id: string;
};

export const GameCardPreviewHeading = ({ id }: GameCardPreviewHeadingProps) => {
  const isMobile = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();

  const gameLink = `${window.location.origin}/game/${id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      enqueueSnackbar("Copied to clipboard", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Failed to copy to clipboard", { variant: "error" });
    }
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      alignContent={"space-between"}
      spacing={3}
    >
      <Link passHref href={"/game/" + id}>
        <Typography variant="h4" color={"primary"}>
          <code>{id}</code>
        </Typography>
      </Link>

      <Tooltip title={gameLink}>
        <Button
          startIcon={<LinkOutlined />}
          variant={"outlined"}
          color={"secondary"}
          onClick={handleCopy}
        >
          Copy Link
        </Button>
      </Tooltip>
    </Stack>
  );
};
