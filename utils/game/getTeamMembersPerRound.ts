/*

Players	  5	6	7	8	9	10
1st Quest	2	2	2	3	3	3
2nd Quest	3	3	3	4	4	4
3rd Quest	2	4	3	4	4	4
4th Quest	3	3	4	5	5	5
5th Quest	3	4	4	5	5	5
 */

export const getTeamMembersPerRound = (numPlayers: number) => {
  switch (numPlayers) {
    case 5:
      return [2, 3, 2, 3, 3];
    case 6:
      return [2, 3, 4, 3, 4];
    case 7:
      return [2, 3, 3, 4, 4];
    case 8:
      return [3, 4, 4, 5, 5];
    case 9:
      return [3, 4, 4, 5, 5];
    case 10:
      return [3, 4, 4, 5, 5];
    default:
      throw new Error("Invalid number of players");
  }
};
