import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { auth } from "@/config";
import Link from "next/link";
import { Logout } from "@mui/icons-material";

export const Navbar = () => {
  const user = useAtomValue(userAtom);

  return (
    <AppBar
      color={"transparent"}
      sx={(theme) => ({ background: "white" })}
      position={"sticky"}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Link
            href={"/"}
            passHref
            style={{
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              fontWeight={"bold"}
              style={{ flexGrow: 1 }}
            >
              Avalon & Friends
            </Typography>
          </Link>

          {Boolean(user) && (
            <Button
              onClick={() => signOut(auth)}
              variant={"outlined"}
              startIcon={<Logout />}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
