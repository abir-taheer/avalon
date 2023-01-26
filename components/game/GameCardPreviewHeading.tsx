import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { LinkOutlined } from "@mui/icons-material";
import { useIsMobile } from "@/hooks/ui";
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
      <Typography variant="h4" color={"primary"}>
        <code>{id}</code>
      </Typography>

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
