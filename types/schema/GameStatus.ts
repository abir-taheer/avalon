export enum GameStatus {
  "waiting" = "waiting",
  "started" = "started",
  "pending_assassin" = "pending_assassin",
  "completed" = "completed",
}

export const isGameStatus = (value: any): value is GameStatus => {
  return Object.values(GameStatus).includes(value);
};
