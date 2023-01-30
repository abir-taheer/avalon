import { storage } from "@/client-config";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { AccountCircle } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { ChangeEventHandler, useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useAuth } from "@/hooks";

const useStyles = makeStyles()({
  FileInput: {
    height: 0,
    width: 0,
  },
});

export const EditPhotoButton = (props: ButtonProps) => {
  const { classes } = useStyles();
  const { authUser } = useAuth();
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
        className={classes.FileInput}
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
