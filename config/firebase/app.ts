import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Analytics, initializeAnalytics } from "firebase/analytics";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/atoms";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
  AppCheck,
} from "firebase/app-check";
import { RECAPTCHA_SITE_KEY } from "@/constants";

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
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [setUser]);
};
