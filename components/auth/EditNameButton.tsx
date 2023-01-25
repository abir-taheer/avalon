import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { userAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { getDefaultPhotoURL } from "@/utils";

export const EditNameButton = () => {
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
    >
      Edit Name
    </Button>
  );
};
