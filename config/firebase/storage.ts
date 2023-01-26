import { app } from "@/config/firebase/app";
import { getStorage } from "@firebase/storage";

export const storage = getStorage(app);
