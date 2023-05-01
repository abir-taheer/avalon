import { Round, RoundStatus } from "@/types/schema";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { Button, colors, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { RoundPreview } from "@/components/game/Round/RoundPreview";
import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { usePrevious } from "@/hooks/general/usePrevious";
import { useRoundResultsDialog } from "@/components/dialog/game/RoundResultsDialog";
import { useOutcomeDialog } from "@/components/dialog/game/OutcomeCardsDialog";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";
import { Pending } from "@mui/icons-material";

export type GameplayProps = {
  rounds: Round[];
};

export const Gameplay = ({ rounds }: GameplayProps) => {
  const openRoleDialog = useRoleDialog();
  const [roundIndex, setRoundIndex] = useState(rounds.length - 1);
  const mostRecentRoundId = useMemo(
    () => rounds[rounds.length - 1]?.id,
    [rounds]
  );
  const secondMostRecentRoundId = usePrevious(mostRecentRoundId);

  const numRounds = useMemo(() => rounds.length, [rounds]);
  const game = useGameContext();

  const round = rounds[roundIndex];
  const openRoundResultsDialog = useRoundResultsDialog();
  const openOutcomesDialog = useOutcomeDialog();

  const playersPerRound = useMemo(
    () => getTeamMembersPerRound(game.playerIds.length),
    [rounds]
  );

  // Every time a new round gets added, change the round index to the last round
  useEffect(() => {
    setRoundIndex(numRounds - 1);
  }, [numRounds]);

  useEffect(() => {
    // Not the kind of change we care about
    // In here we're only doing stuff if the current round changes
    if (secondMostRecentRoundId === mostRecentRoundId) {
      return;
    }

    const previousRound = rounds.find(
      (round) => round.id === secondMostRecentRoundId
    );

    if (!previousRound) {
      return;
    }

    if (previousRound.status === RoundStatus.team_rejected) {
      openRoundResultsDialog({ game, round: previousRound });
    }

    if (
      previousRound.status === RoundStatus.mission_passed ||
      previousRound.status === RoundStatus.mission_failed
    ) {
      openOutcomesDialog({ outcomes: previousRound.outcomes });
    }
  }, [
    openRoundResultsDialog,
    rounds,
    secondMostRecentRoundId,
    mostRecentRoundId,
    game,
    openOutcomesDialog,
  ]);

  return (
    <Stack gap={2}>
      <div>
        <Button onClick={() => openRoleDialog({ game })} variant={"outlined"}>
          Show your role
        </Button>
      </div>

      <Stepper activeStep={round.number - 1} alternativeLabel>
        {[...Array(5)].map((label, index) => {
          const roundFailed =
            typeof game.roundResults[index] !== "undefined" &&
            !game.roundResults[index];

          const roundPassed = game.roundResults[index];
          const roundActive = round.number - 1 === index;

          return (
            <Step key={label}>
              <StepLabel
                error={roundFailed}
                StepIconProps={{
                  sx: {
                    fill: roundPassed
                      ? colors.green[500]
                      : roundActive
                      ? colors.yellow[500]
                      : undefined,
                  },
                }}
                icon={
                  roundActive ? (
                    <Pending
                      sx={(theme) => ({ fill: theme.palette.primary.main })}
                    />
                  ) : undefined
                }
              >
                {playersPerRound[index]} Players
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {round && <RoundPreview game={game} round={round} />}
    </Stack>
  );
};
