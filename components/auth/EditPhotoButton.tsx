import { storage } from "@/client-config";
import { useAuth } from "@/hooks";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { AccountCircle } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";

export const EditPhotoButton = (props: ButtonProps) => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const onUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (ev) => {
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
    },
    []
  );

  const inputElement = useMemo(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    // @ts-ignore
    input.onchange = onUpload;

    return input;
  }, [onUpload]);

  return (
    <Button
      variant={"outlined"}
      startIcon={<AccountCircle />}
      color={"secondary"}
      onClick={() => inputElement.click()}
      disabled={loading}
      {...props}
    >
      {loading ? "Uploading photo..." : "Change Avatar"}
    </Button>
  );
};
