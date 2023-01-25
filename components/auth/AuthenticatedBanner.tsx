import { authUserAtom, userAtom } from "@/atoms";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import { AccountCircle, Edit } from "@mui/icons-material";
import { useCurrentUserGameIdQuery } from "@/queries/useCurrentUserGameIdQuery";
import { GamePreviewCard } from "@/components/game/GamePreviewCard";
import { ChangeEventHandler, useRef } from "react";
import { storage } from "@/config/firebase/storage";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { realtime } from "@/config";
import { ref as realtimeRef, update } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { EditPhotoButton } from "@/components/auth/EditPhotoButton";
import { EditNameButton } from "@/components/auth/EditNameButton";

export const AuthenticatedBanner = () => {
  const user = useAtomValue(userAtom);

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
      <img
        referrerPolicy={"no-referrer"}
        src={user!.photoURL}
        alt={"User Avatar"}
        style={{ height: 64, width: 64, borderRadius: "50%" }}
      />

      <Typography>You're signed in as </Typography>
      <Typography color={"primary"}>{user!.displayName}</Typography>

      <Stack direction={"row"} spacing={2}>
        <EditNameButton />
        <EditPhotoButton />
      </Stack>
    </Stack>
  );
};
