import { app } from "./app";
import { getStorage } from "@firebase/storage";

export const storage = getStorage(app);
