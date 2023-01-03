import { getFirestore } from "firebase/firestore";
import { app } from "./app";

export const firestore = getFirestore(app);
