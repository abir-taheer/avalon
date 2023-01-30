import { auth } from "@/client-config";
import { Logout } from "@mui/icons-material";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";
import { useAuth } from "@/hooks";
import { SignOutButton } from "@/components";

const useStyles = makeStyles()({
  AppBar: {
    background: "white",
  },
  ToolbarLogo: {
    flexGrow: 1,
  },
});

export const Navbar = () => {
  const { classes } = useStyles();
  const { user } = useAuth();
  const isSignedIn = Boolean(user);

  return (
    <AppBar
      className={classes.AppBar}
      color={"transparent"}
      position={"sticky"}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={"/"} passHref className={classes.ToolbarLogo}>
            <Typography variant="h6" noWrap fontWeight={"bold"}>
              Avalon & Friends
            </Typography>
          </Link>

          {isSignedIn && <SignOutButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
