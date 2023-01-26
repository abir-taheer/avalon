import { useAtomValue } from "jotai";
import { authUserAtom } from "@/atoms";

import { Button, ButtonProps } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import { ChangeEventHandler, useRef, useState } from "react";

import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/config";
import { updateUserProfile } from "@/utils/user/updateUserProfile";

export const EditPhotoButton = (props: ButtonProps) => {
  const authUser = useAtomValue(authUserAtom);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (!authUser) {
      throw new Error("User not signed in");
    }

    // TODO - add real error reporting here instead of alerts

    const file = ev.target.files?.[0];
    if (!file) {
      alert("No file");
      return;
    }

    const maxSize = 1024 * 1024 * 5;

    if (file.size > maxSize) {
      alert("File too large");
      return;
    }

    const objectRef = storageRef(storage, `avatars/${authUser.uid}`);

    setLoading(true);

    const snapshot = await uploadBytes(objectRef, file);

    const photoURL = await getDownloadURL(snapshot.ref);

    // Update their profile entry in the auth service
    await updateUserProfile({ photoURL });

    setLoading(false);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ height: 0, width: 0 }}
        onChange={onUpload}
      />
      <Button
        variant={"outlined"}
        startIcon={<AccountCircle />}
        color={"secondary"}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        {...props}
      >
        {loading ? "Uploading photo..." : "Change Avatar"}
      </Button>
    </>
  );
};
