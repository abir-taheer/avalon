import { getStorage } from "@firebase/storage";
import { app } from "@/config/firebase/app";

export const storage = getStorage(app);
