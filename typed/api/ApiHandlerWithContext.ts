import { ApiContext } from "@/typed/api/ApiContext";

export type ApiHandlerWithContext<Response = unknown> = (
  context: ApiContext
) => Response | Promise<Response>;
