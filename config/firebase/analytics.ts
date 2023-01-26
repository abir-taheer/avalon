import { app } from "./app";
import { Analytics, initializeAnalytics } from "firebase/analytics";

export let analytics: Analytics;

if (typeof document !== "undefined") {
  analytics = initializeAnalytics(app);
}
