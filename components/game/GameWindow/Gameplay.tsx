import { Game, Round, RoundStatus } from "@/types/schema";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { RoundPreview } from "@/components/game/Round/RoundPreview";
import { useEffect, useMemo, useState } from "react";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";
import { makeStyles } from "tss-react/mui";
import { useGameContext } from "@/context/GameContext";

export type GameplayProps = {
  rounds: Round[];
};

const useStyles = makeStyles()((theme) => ({
  FailedStepIcon: {
    fill: theme.palette.error.main,
  },

  SuccessStepIcon: {
    fill: theme.palette.success.main,
  },
}));
export const Gameplay = ({ rounds }: GameplayProps) => {
  const openRoleDialog = useRoleDialog();
  const { classes } = useStyles();
  const [roundIndex, setRoundIndex] = useState(rounds.length - 1);
  const lastRound = useMemo(() => rounds[rounds.length - 1], [rounds]);
  const game = useGameContext();

  useEffect(() => {
    setRoundIndex(rounds.length - 1);
  }, [lastRound]);

  const teamMembersPerRound = useMemo(
    () => getTeamMembersPerRound(game.playerIds.length),
    [game]
  );

  const round = rounds[roundIndex];

  const completeRounds = useMemo(
    () =>
      rounds.filter(
        (round) =>
          round.status === RoundStatus.mission_failed ||
          round.status === RoundStatus.mission_passed
      ),
    [rounds]
  );

  return (
    <Stack>
      <div>
        <Button onClick={() => openRoleDialog({ game })} variant={"outlined"}>
          Show your role
        </Button>
      </div>

      <Stepper alternativeLabel>
        {teamMembersPerRound.map((count, index) => {
          let className: string = "";

          if (completeRounds[index]?.status === RoundStatus.mission_failed) {
            className = classes.FailedStepIcon;
          }

          if (completeRounds[index]?.status === RoundStatus.mission_passed) {
            className = classes.SuccessStepIcon;
          }

          return (
            <Step
              key={index}
              onClick={() => {
                const existingRoundIndex = rounds
                  .reverse()
                  .findIndex((round) => round.number === index + 1);

                if (existingRoundIndex !== -1) {
                  setRoundIndex(rounds.length - existingRoundIndex - 1);
                }
              }}
            >
              <StepLabel icon={count} StepIconProps={{ className }}>
                Round {index + 1}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {round && <RoundPreview game={game} round={round} />}
    </Stack>
  );
};
