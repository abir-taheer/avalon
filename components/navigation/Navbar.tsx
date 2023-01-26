import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { auth } from "@/config";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { makeStyles } from "@/utils/tss";

const useStyles = makeStyles({
  AppBar: {
    background: "white",
  },
  ToolbarLogo: {
    flexGrow: 1,
  },
});

export const Navbar = () => {
  const { classes } = useStyles();
  const user = useAtomValue(userAtom);
  const isSignedIn = Boolean(user);

  return (
    <AppBar
      className={classes.AppBar}
      color={"transparent"}
      position={"sticky"}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Link href={"/"} passHref className={classes.ToolbarLogo}>
            <Typography variant="h6" noWrap fontWeight={"bold"}>
              Avalon & Friends
            </Typography>
          </Link>

          {isSignedIn && (
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
