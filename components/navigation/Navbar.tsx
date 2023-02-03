import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "tss-react/mui";

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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
