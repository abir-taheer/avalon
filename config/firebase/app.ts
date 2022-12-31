import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getDatabase,
  ref,
  serverTimestamp,
  onDisconnect,
  onValue,
  set,
} from "firebase/database";
import { Analytics, initializeAnalytics } from "firebase/analytics";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/atoms";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  AppCheck,
} from "firebase/app-check";
import { RECAPTCHA_SITE_KEY } from "@/constants";
import { User } from "@/schema";
import { fullName } from "faker-en/person/fullName";
import { getDefaultUserProfilePic } from "@/utils/user/getDefaultUserProfilePic";

export const firebaseConfig = {
  apiKey: "AIzaSyBCRBBaJCPxvv4A1iqBYaFDn8umbs-gpQQ",
  authDomain: "avalon-bikers.firebaseapp.com",
  projectId: "avalon-bikers",
  storageBucket: "avalon-bikers.appspot.com",
  messagingSenderId: "507668939569",
  appId: "1:507668939569:web:5cac6649d931fdf49a6610",
  measurementId: "G-MPLYM744L2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const realtime = getDatabase(app);

export const RecaptchaProvider = new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY);

export let appCheck: AppCheck;
export let analytics: Analytics;

if (typeof document !== "undefined") {
  appCheck = initializeAppCheck(app, {
    provider: RecaptchaProvider,
    isTokenAutoRefreshEnabled: true,
  });

  analytics = initializeAnalytics(app);
}

export const listenToUserActivity = async (id: string) => {
  const userStatusDatabaseRef = ref(realtime, "/status/" + id);

  // We'll create two constants which we will write to
  // the Realtime database when this device is offline
  // or online.
  const isOfflineForDatabase = {
    state: "offline",
    last_changed: serverTimestamp(),
  };

  const isOnlineForDatabase = {
    state: "online",
    last_changed: serverTimestamp(),
  };

  // Create a reference to the special '.info/connected' path in
  // Realtime Database. This path returns `true` when connected
  // and `false` when disconnected.

  let updated = false;

  const unsubscribe = onValue(
    userStatusDatabaseRef,
    async (snapshot) => {
      if (snapshot.val() === false || updated) {
        return;
      }

      await onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase);

      await set(userStatusDatabaseRef, isOnlineForDatabase);

      updated = true;
    },
    console.error
  );

  return unsubscribe;
};

export const useAuthListener = () => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    return auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        setUser(null);
        return;
      }

      let name = authUser.displayName;

      if (!name) {
        name = fullName();

        await updateProfile(authUser, {
          displayName: name,
        });
      }

      const userDocRef = doc(firestore, "users", authUser.uid);

      let user = await getDoc(userDocRef);

      if (!user.exists()) {
        // Create a new user object for the current user

        const newUser: User = {
          id: authUser.uid,
          displayName: name,
          photoUrl: authUser.photoURL || getDefaultUserProfilePic({ name }),
          active: false,
          anonymous: authUser.isAnonymous,
        };

        await setDoc(userDocRef, newUser);

        user = await getDoc(userDocRef);
      }

      setUser(user.data() as User);

      // The user object should exist now and so we need to watch it for updates
      const unsubscribeToUserSnapshot = onSnapshot(userDocRef, (doc) => {
        setUser(doc.data() as User);
      });

      const unsubscribeToActivityStatus = await listenToUserActivity(user.id);

      const unsubscribe = () => {
        unsubscribeToUserSnapshot();
        unsubscribeToActivityStatus();
      };

      // If this for some reason unmounts, unsubscribe to prevent memory leaks
      return unsubscribe;
    });
  }, [setUser]);
};
