import { ApiContext } from "@/types/api/ApiContext";
import { UserRecord } from "firebase-admin/auth";

export type ApiContextWithAuth = Omit<ApiContext, "user"> & {
  user: UserRecord;
};
