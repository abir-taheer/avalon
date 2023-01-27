import { getDatabase } from "firebase/database";
import { app } from "./app";

export const realtime = getDatabase(app);
