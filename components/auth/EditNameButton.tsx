import { userAtom } from "@/atoms";
import { getDefaultPhotoURL } from "@/utils";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { Edit } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useAtomValue } from "jotai";

export const EditNameButton = (props: ButtonProps) => {
  const user = useAtomValue(userAtom);
  const handleClick = async () => {
    if (!user) {
      throw new Error("User not signed in");
    }

    // TODO - update with real input field
    const newName = prompt("Enter your new display name");

    if (!newName || newName === user.displayName) {
      return;
    }

    let photoURL = user.photoURL;

    if (!photoURL || photoURL?.startsWith("https://ui-avatars.com/api/")) {
      photoURL = getDefaultPhotoURL({ name: newName });
    }

    await updateUserProfile({ displayName: newName, photoURL });
  };

  return (
    <Button
      variant={"outlined"}
      startIcon={<Edit />}
      color={"secondary"}
      onClick={handleClick}
      {...props}
    >
      Edit Name
    </Button>
  );
};
