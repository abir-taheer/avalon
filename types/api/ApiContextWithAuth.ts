import { UserRecord } from "firebase-admin/lib/auth";
import { ApiContext } from "@/types/api/ApiContext";

export type ApiContextWithAuth = Omit<ApiContext, "user"> & {
  user: UserRecord;
};
