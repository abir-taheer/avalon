import { UserRecord } from "firebase-admin/auth";
import { ApiHandlerError } from "./withErrorHandler";
import {
  withFirebaseAdmin,
  WithFirebaseAdminContext,
  WithFirebaseAdminHandler,
} from "./withFirebaseAdmin";

type ContextWithUser = Omit<WithFirebaseAdminContext, "user"> & {
  user: UserRecord;
};

export type WrappedApiResponse<Data> = {
  data: Data;
};

export type FirebaseAdminHandlerWithUser<Response = unknown> = (
  context: ContextWithUser
) => Response | Promise<Response>;

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
