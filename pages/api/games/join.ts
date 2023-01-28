import * as API from "@/api-controllers";
import { withAuthenticatedApiContext } from "@/middleware";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export default withAuthenticatedApiContext(async (context) => {
  const { req } = context;

  if (req.method === "POST") {
    return API.Game.Join.POST.Handler(context);
  }

  if (req.method === "DELETE") {
    return API.Game.Join.DELETE.Handler(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});
