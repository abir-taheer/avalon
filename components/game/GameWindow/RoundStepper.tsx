import { Round } from "@/types/schema";
import { useGameContext } from "@/context/GameContext";
import { colors, Step, StepLabel, Stepper } from "@mui/material";
import { Pending } from "@mui/icons-material";
import { useMemo } from "react";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";

export type RoundStepperProps = {
  roundNumber: number;
};

export const RoundStepper = ({ roundNumber }: RoundStepperProps) => {
  const game = useGameContext();

  const playersPerRound = useMemo(
    () => getTeamMembersPerRound(game.playerIds.length),
    [game]
  );

  return (
    <Stepper activeStep={roundNumber - 1} alternativeLabel>
      {[...Array(5)].map((label, index) => {
        const roundFailed =
          typeof game.roundResults[index] !== "undefined" &&
          !game.roundResults[index];

        const roundPassed = game.roundResults[index];
        const roundActive =
          roundNumber - 1 === index &&
          typeof game.roundResults[index] === "undefined";

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
  );
};
