import { useOutcomeDialog } from "@/components/dialog/game/OutcomeCardsDialog";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { useRoundResultsDialog } from "@/components/dialog/game/RoundResultsDialog";
import { RoundStepper } from "@/components/game/GameWindow/RoundStepper";
import { RoundPreview } from "@/components/game/Round/RoundPreview";
import { useGameContext } from "@/context/GameContext";
import { usePrevious } from "@/hooks/general/usePrevious";
import { Round, RoundStatus } from "@/types/schema";
import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGameOptionsPreviewDialog } from "@/components/dialog/game/GameOptionsPreviewDialog";
import { useSetAtom } from "jotai";
import { roundLeaderIdAtom } from "@/atoms/roundLeaderIdAtom";

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
  const openGameOptionsDialog = useGameOptionsPreviewDialog();
  const setRoundLeaderId = useSetAtom(roundLeaderIdAtom);

  // Every time a new round gets added, change the round index to the last round
  useEffect(() => {
    setRoundIndex(numRounds - 1);
  }, [numRounds]);

  useEffect(() => {
    setRoundLeaderId(round.leaderId ?? null);
  }, [setRoundLeaderId, round.leaderId]);

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
      <RoundStepper roundNumber={round.number} />

      <Stack direction={"row"} gap={4} justifyContent={"center"}>
        <Button onClick={() => openRoleDialog({ game })} variant={"outlined"}>
          Show your role
        </Button>

        <Button
          variant={"outlined"}
          color={"secondary"}
          onClick={() => openGameOptionsDialog({ game })}
        >
          Show Game Options
        </Button>
      </Stack>

      {round && <RoundPreview game={game} round={round} />}
    </Stack>
  );
};
