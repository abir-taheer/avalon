import { useEditDisplayNameDialog } from "@/components/dialog/auth/EditDisplayNameDialog";
import { useAuth } from "@/hooks";
import { getDefaultPhotoURL } from "@/utils";
import { updateUserProfile } from "@/utils/user/updateUserProfile";
import { Edit } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const EditNameButton = (props: ButtonProps) => {
  const { user } = useAuth();
  const promptName = useEditDisplayNameDialog();

  const handleClick = async () => {
    if (!user) {
      throw new Error("User not signed in");
    }

    const newName = await promptName({ initialValue: user.displayName });

    if (!newName?.displayName || newName.displayName === user.displayName) {
      return;
    }

    const { displayName } = newName;

    let photoURL = user.photoURL;

    if (!photoURL || photoURL?.startsWith("https://ui-avatars.com/api/")) {
      photoURL = getDefaultPhotoURL({ name: displayName });
    }

    await updateUserProfile({ displayName, photoURL });
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
