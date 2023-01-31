export enum GameStatus {
  "waiting" = "waiting",
  "started" = "started",
  "completed" = "completed",
}

export const isGameStatus = (value: any): value is GameStatus => {
  return Object.values(GameStatus).includes(value);
};
