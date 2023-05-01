import { withApiContext } from "@/middleware/withApiContext";
import { ApiContextWithAuth } from "@/types/api/ApiContextWithAuth";
import { ApiHandlerWithContext } from "@/types/api/ApiHandlerWithContext";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export type FirebaseAdminHandlerWithUser<Response = unknown> = (
  context: ApiContextWithAuth
) => Response | Promise<Response>;

export const withAuthenticatedApiContext = (
  next: FirebaseAdminHandlerWithUser
) => {
  const handler: ApiHandlerWithContext = async (context) => {
    const { user } = context;

    if (!user) {
      throw new ApiHandlerError({
        code: "unauthenticated",
        message: "Authentication is required",
        status: 403,
      });
    }

    // Make sure that the user object is defined
    return next(context as ApiContextWithAuth);
  };

  return withApiContext(handler);
};
