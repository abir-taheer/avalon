import { UseQueryOptions } from "react-query";

export enum QUERY_KEY {
  USER_CURRENT_GAME_ID = "QUERY::USER_CURRENT_GAME_ID",
  GAME = "QUERY::GAME",
  ROUND = "QUERY::ROUND",
  ROLE = "QUERY::ROLE",
  REALTIME_USER = "QUERY::REALTIME_USER",
}
export type UseQueryWrapperProps<DataType> = Omit<
  UseQueryOptions<DataType>,
  "queryKey" | "queryFn"
>;
