import { ApiHandlerError } from "./withErrorHandler";
import {
  WithFirebaseAdminContext,
  WithFirebaseAdminHandler,
  withFirebaseAdmin,
} from "./withFirebaseAdmin";
import { UserRecord } from "firebase-admin/auth";

type ContextWithUser = Omit<WithFirebaseAdminContext, "user"> & {
  user: UserRecord;
};

export type WrappedApiResponse<Data> = {
  data: Data;
};

export type FirebaseAdminHandlerWithUser = (context: ContextWithUser) => any;

export const withAuth = (next: FirebaseAdminHandlerWithUser) => {
  const handler: WithFirebaseAdminHandler = async (context) => {
    const { user } = context;

    if (!user) {
      throw new ApiHandlerError({
        code: "unauthenticated",
        message: "Authentication is required",
        status: 403,
      });
    }

    // Make sure that the user object is defined
    return next(context as ContextWithUser);
  };

  return withFirebaseAdmin(handler);
};
