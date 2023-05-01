import { Round } from "@/types/schema";
import { useGameContext } from "@/context/GameContext";
import { colors, Step, StepLabel, Stepper } from "@mui/material";
import {
  CheckCircleOutline,
  CheckOutlined,
  Circle,
  CircleOutlined,
  CloseOutlined,
  Pending,
} from "@mui/icons-material";
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
              icon={
                roundActive ? (
                  <Pending
                    sx={(theme) => ({
                      fill: theme.palette.primary.main,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: "50%",
                    })}
                  />
                ) : roundFailed ? (
                  <CloseOutlined color={"error"} />
                ) : roundPassed ? (
                  <CheckOutlined
                    sx={(theme) => ({ fill: theme.palette.success.light })}
                  />
                ) : (
                  <CircleOutlined sx={{ fill: "grey" }} />
                )
              }
            >
              {playersPerRound[index]}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
