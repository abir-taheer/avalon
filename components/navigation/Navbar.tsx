import { Button, Stack } from "@mui/material";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Stack direction={"row"}>
      <Link href={"/"} passHref>
        <Button>Home</Button>
      </Link>

      <Link href={"/new-game"}>
        <Button>New Game</Button>
      </Link>
    </Stack>
  );
};
