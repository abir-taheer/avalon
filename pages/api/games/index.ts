import * as API from "@/api-controllers";
import { ApiHandlerError, withAuth } from "@/middleware";

export default withAuth(async (context) => {
  if (context.req.method === "POST") {
    return API.Game.POST.Handler(context);
  }

  throw new ApiHandlerError({
    code: "unimplemented",
    message: "This method is not implemented",
    status: 405,
  });
});

export type POST_GamesAPIResponse = {
  id: string;
};
