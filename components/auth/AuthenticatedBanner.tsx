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

export const AuthenticatedBanner = () => {
  const user = useAtomValue(userAtom);
  const authUser = useAtomValue(authUserAtom);
  const { data, isLoading } = useCurrentUserGameIdQuery();
  const inputRef = useRef<HTMLInputElement | null>(null);
  console.log(authUser);

  const onUpload: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const file = ev.target.files?.[0];
    if (!file) {
      alert("No file");
      return;
    }

    const maxSize = 1024 * 1024 * 2;

    if (file.size > maxSize) {
      alert("File too large");
      return;
    }

    const fileRef = storageRef(storage, `avatars/${user?.uid}`);

    uploadBytes(fileRef, file).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");

      await updateProfile(authUser!, {
        photoURL: await getDownloadURL(snapshot.ref),
      });
      console.log(snapshot.metadata);

      const rtRef = realtimeRef(realtime, `user/${user?.uid}`);
      await update(rtRef, {
        photoURL: await getDownloadURL(snapshot.ref),
      });
    });
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ height: 0, width: 0 }}
        onChange={onUpload}
      />
      <img
        referrerPolicy={"no-referrer"}
        src={user!.photoURL}
        alt={"User Avatar"}
        style={{ height: 64, width: 64, borderRadius: "50%" }}
      />

      <Typography>You're signed in as </Typography>
      <Typography color={"primary"}>{user!.displayName}</Typography>

      <Stack direction={"row"} spacing={2}>
        <Button variant={"outlined"} startIcon={<Edit />} color={"secondary"}>
          Edit Name
        </Button>
        <Button
          variant={"outlined"}
          startIcon={<AccountCircle />}
          color={"secondary"}
          onClick={() => inputRef.current?.click()}
        >
          Change Avatar
        </Button>
      </Stack>

      <div
        style={{
          width: "80%",
          height: 1,
          background: "black",
          opacity: 0.1,
          margin: "48px 0",
        }}
      />

      {isLoading && <CircularProgress />}

      {data?.id && <GamePreviewCard id={data.id} />}
    </Stack>
  );
};
