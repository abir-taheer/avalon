import { useOutcomeDialog } from "@/components/dialog/game/OutcomeCardsDialog";
import { useRoleDialog } from "@/components/dialog/game/PlayerRoleDialog";
import { useRoundResultsDialog } from "@/components/dialog/game/RoundResultsDialog";
import { RoundStepper } from "@/components/game/GameWindow/RoundStepper";
import { RoundPreview } from "@/components/game/Round/RoundPreview";
import { useGameContext } from "@/context/GameContext";
import { usePrevious } from "@/hooks/general/usePrevious";
import { Round, RoundStatus } from "@/types/schema";
import { Button, LinearProgress, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGameOptionsPreviewDialog } from "@/components/dialog/game/GameOptionsPreviewDialog";
import { useSetAtom } from "jotai";
import { roundLeaderIdAtom } from "@/atoms/roundLeaderIdAtom";
import { useRoundQuery } from "@/queries/useRoundQuery";

export type GameplayProps = {};

export const Gameplay = ({}: GameplayProps) => {
  const openRoleDialog = useRoleDialog();
  const game = useGameContext();

  const previousRoundId =
    Number(game.currentRoundId) > 1
      ? (Number(game.currentRoundId) - 1).toString()
      : null;

  const { data: round } = useRoundQuery({
    game: game.id,
    round: game.currentRoundId!,
  });

  const { data: previousRound } = useRoundQuery({
    game: game.id,
    round: previousRoundId || "null",
    skip: !previousRoundId,
  });

  const openRoundResultsDialog = useRoundResultsDialog();
  const openOutcomesDialog = useOutcomeDialog();
  const openGameOptionsDialog = useGameOptionsPreviewDialog();
  const setRoundLeaderId = useSetAtom(roundLeaderIdAtom);

  useEffect(() => {
    setRoundLeaderId(round?.leaderId ?? null);
  }, [setRoundLeaderId, round]);

  useEffect(() => {
    // Not the kind of change we care about
    // In here we're only doing stuff if the current round changes
    if (previousRoundId === game.currentRoundId) {
      return;
    }

    if (previousRound?.status === RoundStatus.team_rejected) {
      openRoundResultsDialog({ game, round: previousRound });
    }

    if (
      previousRound?.status === RoundStatus.mission_passed ||
      previousRound?.status === RoundStatus.mission_failed
    ) {
      openOutcomesDialog({ outcomes: previousRound.outcomes });
    }
  }, [
    openRoundResultsDialog,
    game,
    openOutcomesDialog,
    previousRoundId,
    previousRound,
  ]);

  if (!round) {
    return <LinearProgress />;
  }

  if (previousRoundId && !previousRound) {
    console.log(previousRoundId, previousRound);
    return <LinearProgress />;
  }

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
