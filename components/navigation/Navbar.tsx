import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { auth } from "@/config";

export const Navbar = () => {
  const user = useAtomValue(userAtom);

  return (
    <AppBar color={"transparent"} position={"sticky"}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            fontWeight={"bold"}
            component="a"
            href="/"
            style={{ flexGrow: 1 }}
          >
            Avalon & Friends
          </Typography>

          {Boolean(user) && (
            <Button onClick={() => signOut(auth)}>Log Out</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
