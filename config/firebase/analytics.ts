import { Analytics, initializeAnalytics } from "firebase/analytics";
import { app } from "./app";

export let analytics: Analytics;

if (typeof document !== "undefined") {
  analytics = initializeAnalytics(app);
}
