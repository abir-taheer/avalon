import { auth, realtime } from "@/client-config";
import { updateProfile } from "firebase/auth";
import { ref, update } from "firebase/database";

export type UpdateProfileParams = {
  displayName?: string;
  photoURL?: string;
  active?: boolean;
};

export const updateUserProfile = async (params: UpdateProfileParams) => {
  const user = auth.currentUser;
  const { displayName, photoURL, active } = params;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const authData: Record<string, string> = {};
  const rtData: Record<string, string | boolean> = {};

  if (displayName) {
    rtData.displayName = displayName;
    authData.displayName = displayName;
  }

  if (photoURL) {
    rtData.photoURL = photoURL;
    authData.photoURL = photoURL;
  }

  if (typeof active === "boolean") {
    rtData.active = active;
  }

  const userRealtimeRef = ref(realtime, `user/${user.uid}`);

  const realtimeUpdate = update(userRealtimeRef, rtData);
  const profileUpdate = updateProfile(user, authData);

  await Promise.allSettled([profileUpdate, realtimeUpdate]);
};
