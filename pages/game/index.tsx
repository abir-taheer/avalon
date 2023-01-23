import { Typography } from "@mui/material";
import { LinkButton } from "@/components/button/LinkButton";

export default function InvalidGamePage() {
  return (
    <>
      <Typography variant={"h2"}>You've entered an invalid page</Typography>

      <LinkButton href={"/"}>Go Back To Home</LinkButton>
    </>
  );
}
