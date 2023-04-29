import * as API from "@/api-controllers";
import { withAuthenticatedApiContext } from "@/middleware";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export default withAuthenticatedApiContext(async (context) => {
  const { req } = context;

  if (req.method === "POST") {
    return API.Game.Vote.POST.Handler(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});
