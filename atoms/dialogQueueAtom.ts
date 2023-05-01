import { DialogQueueItem } from "@/components/dialog/queue/useDialog";
import { atom } from "jotai";

export const dialogQueueAtom = atom<DialogQueueItem<any, any>[]>([]);
