import { RECAPTCHA_SITE_KEY } from "@/constants";
import {
  AppCheck,
  ReCaptchaV3Provider,
  initializeAppCheck,
} from "firebase/app-check";
import { app } from "./app";

export const RecaptchaProvider = new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY);

export let appCheck: AppCheck;

if (typeof document !== "undefined") {
  appCheck = initializeAppCheck(app, {
    provider: RecaptchaProvider,
    isTokenAutoRefreshEnabled: true,
  });
}
