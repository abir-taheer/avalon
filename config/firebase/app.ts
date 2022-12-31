import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
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
export const db = getFirestore(app);

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

export const useAuthListener = () => {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    return auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        setUser(null);
        return;
      }

      const userDocRef = doc(db, "users", authUser.uid);

      let user = await getDoc(userDocRef);

      if (!user.exists()) {
        // Create a new user object for the current user

        const newUser: User = {
          id: authUser.uid,
          displayName: authUser.displayName || fullName(),
          photoUrl: authUser.photoURL || null,
          active: false,
          anonymous: authUser.isAnonymous,
        };

        await setDoc(userDocRef, newUser);

        user = await getDoc(userDocRef);
      }

      setUser(user.data() as User);

      // The user object should exist now and so we need to watch it for updates
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        setUser(doc.data() as User);
      });

      // If this for some reason unmounts, unsubscribe to prevent memory leaks
      return unsubscribe;
    });
  }, [setUser]);
};
