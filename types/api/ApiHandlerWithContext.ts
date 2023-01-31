import { ApiContext } from "@/types/api/ApiContext";

export type ApiHandlerWithContext<Response = unknown> = (
  context: ApiContext
) => Response | Promise<Response>;
