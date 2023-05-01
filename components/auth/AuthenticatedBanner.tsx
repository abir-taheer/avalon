import { SignOutButton } from "@/components";
import { EditNameButton } from "@/components/auth/EditNameButton";
import { EditPhotoButton } from "@/components/auth/EditPhotoButton";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { useAuth } from "@/hooks";
import { useIsMobile } from "@/hooks/ui";
import { Container, Stack, Typography } from "@mui/material";

export const AuthenticatedBanner = () => {
  const { user } = useAuth();

  const isMobile = useIsMobile();

  return (
    <Stack spacing={4} direction={"column"} alignItems={"center"}>
      <Stack spacing={1} justifyContent={"center"} alignItems={"center"}>
        <OptimizedAvatar src={user!.photoURL} height={128} width={128} />

        <Typography>You're signed in as</Typography>
        <Typography color={"primary"}>{user!.displayName}</Typography>
      </Stack>

      <Container maxWidth={"lg"}>
        <Stack
          spacing={isMobile ? 1 : 2}
          direction={isMobile ? "column" : "row"}
        >
          <EditNameButton fullWidth />
          <EditPhotoButton fullWidth />
          <SignOutButton fullWidth />
        </Stack>
      </Container>
    </Stack>
  );
};
