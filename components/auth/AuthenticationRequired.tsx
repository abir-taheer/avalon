import { AnonymousLoginButton, GoogleLoginButton } from "@/components";
import { UndrawAuthentication } from "@/illustrations/UndrawAuthentication";
import { Container, Divider, Stack, Typography } from "@mui/material";

export const AuthenticationRequired = () => {
  return (
    <Container maxWidth={"sm"}>
      <Stack
        spacing={2}
        alignContent={"center"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <UndrawAuthentication />

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
