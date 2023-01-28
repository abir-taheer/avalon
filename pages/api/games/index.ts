import * as API from "@/api-controllers";
import { withAuthenticatedApiContext } from "@/middleware";
import { ApiHandlerError } from "@/utils/api/ApiHandlerError";

export default withAuthenticatedApiContext(async (context) => {
  if (context.req.method === "POST") {
    return API.Game.POST.Handler(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});
