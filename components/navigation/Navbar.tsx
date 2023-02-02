import { useAuth } from "@/hooks";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export const Navbar = () => {
  const { user } = useAuth();
  const isSignedIn = Boolean(user);

  return (
    <AppBar color={"transparent"} position={"sticky"}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={"/"} passHref>
            <Typography variant="h6" noWrap fontWeight={"bold"}>
              Avalon & Friends
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
