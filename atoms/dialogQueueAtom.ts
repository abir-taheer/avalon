import { atom } from "jotai";
import { DialogQueueItem } from "@/components/dialog/queue/useDialog";

export const dialogQueueAtom = atom<DialogQueueItem<any, any>[]>([]);
