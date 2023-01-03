import { app } from "./app";
import { getDatabase } from "firebase/database";

export const realtime = getDatabase(app);
