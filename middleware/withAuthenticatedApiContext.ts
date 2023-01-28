import { ApiHandlerError } from "@/utils/api/ApiHandlerError";
import { ApiHandlerWithContext } from "@/typed/api/ApiHandlerWithContext";
import { ApiContextWithAuth } from "@/typed/api/ApiContextWithAuth";
import { withApiContext } from "@/middleware/withApiContext";

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
