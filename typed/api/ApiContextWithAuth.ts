import { UserRecord } from "firebase-admin/lib/auth";
import { ApiContext } from "@/typed/api/ApiContext";

export type ApiContextWithAuth = Omit<ApiContext, "user"> & {
  user: UserRecord;
};
