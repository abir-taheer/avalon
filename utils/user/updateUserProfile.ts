import { auth, realtime } from "@/client-config";
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";

export type UpdateProfileParams = {
  displayName?: string;
  photoURL?: string;
};

export const updateUserProfile = async (params: UpdateProfileParams) => {
  const user = auth.currentUser;
  const { displayName, photoURL } = params;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const data: Record<string, string> = {};

  if (displayName) {
    data.displayName = displayName;
  }

  if (photoURL) {
    data.photoURL = photoURL;
  }

  const userRealtimeRef = ref(realtime, `user/${user.uid}`);

  const realtimeUpdate = update(userRealtimeRef, data);
  const profileUpdate = updateProfile(user, data);

  await Promise.allSettled([profileUpdate, realtimeUpdate]);
};
