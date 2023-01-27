import * as API from "@/api-controllers";
import { ApiHandlerError, withAuth } from "@/middleware";

export default withAuth(async (context) => {
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
