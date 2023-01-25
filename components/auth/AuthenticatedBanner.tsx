import { userAtom } from "@/atoms";
import { Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { EditPhotoButton } from "@/components/auth/EditPhotoButton";
import { EditNameButton } from "@/components/auth/EditNameButton";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";

export const AuthenticatedBanner = () => {
  const user = useAtomValue(userAtom);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
      <OptimizedAvatar src={user!.photoURL} height={128} width={128} />

      <Typography>You're signed in as </Typography>
      <Typography color={"primary"}>{user!.displayName}</Typography>

      <Stack direction={"row"} spacing={2}>
        <EditNameButton />
        <EditPhotoButton />
      </Stack>
    </Stack>
  );
};
