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
import { RoundStepper } from "@/components/game/GameWindow/RoundStepper";

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

      <RoundStepper roundNumber={round.number} />

      {round && <RoundPreview game={game} round={round} />}
    </Stack>
  );
};
