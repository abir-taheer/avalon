import { useAuth } from "@/hooks";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/atoms/darkModeAtom";

const useStyles = makeStyles()({
  ToolbarLogo: {
    flexGrow: 1,
  },
});

export const Navbar = () => {
  const { classes } = useStyles();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const { user } = useAuth();

  const toggle = () => setDarkMode((prev) => !prev);

  return (
    <AppBar position={"sticky"} color={"secondary"}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={"/"} passHref className={classes.ToolbarLogo}>
            <Typography variant="h6" noWrap fontWeight={"bold"}>
              Avalon & Friends
            </Typography>
          </Link>

          {user && <Typography>Hi, {user.displayName}!</Typography>}

          <IconButton sx={{ marginLeft: 2 }} onClick={toggle}>
            {darkMode ? (
              <LightModeOutlined fill={"white"} />
            ) : (
              <DarkModeOutlined fill={"white"} sx={{ fill: "white" }} />
            )}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
