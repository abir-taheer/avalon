import { Container, Divider, Stack, Typography } from "@mui/material";
import { AnonymousLoginButton, GoogleLoginButton } from "@/components";
import { UndrawAuthentication } from "@/illustrations/UndrawAuthentication";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  Illustration: {
    height: 200,
    width: 200,
    objectFit: "contain",
  },
});

export const AuthenticationRequired = () => {
  const { classes } = useStyles();

  return (
    <Container maxWidth={"sm"}>
      <Stack
        spacing={2}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <UndrawAuthentication className={classes.Illustration} />

        <Typography textAlign={"center"}>
          You'll need to sign in to continue
        </Typography>

        <Divider />

        <Stack
          direction={"row"}
          spacing={4}
          alignContent={"center"}
          alignItems={"center"}
        >
          <AnonymousLoginButton />
          <GoogleLoginButton />
        </Stack>
      </Stack>
    </Container>
  );
};
