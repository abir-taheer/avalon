import { userAtom } from "@/atoms";
import { Container, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { EditPhotoButton } from "@/components/auth/EditPhotoButton";
import { EditNameButton } from "@/components/auth/EditNameButton";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";
import { useIsMobile } from "@/hooks/ui";

export const AuthenticatedBanner = () => {
  const user = useAtomValue(userAtom);

  const isMobile = useIsMobile();

  return (
    <Stack spacing={4} direction={"column"} alignItems={"center"}>
      <Stack spacing={1} justifyContent={"center"} alignItems={"center"}>
        <OptimizedAvatar src={user!.photoURL} height={128} width={128} />

        <Typography>You're signed in as</Typography>
        <Typography color={"primary"}>{user!.displayName}</Typography>
      </Stack>

      <Container maxWidth={"sm"}>
        <Stack
          spacing={isMobile ? 1 : 2}
          direction={isMobile ? "column" : "row"}
        >
          <EditNameButton fullWidth />
          <EditPhotoButton fullWidth />
        </Stack>
      </Container>
    </Stack>
  );
};
