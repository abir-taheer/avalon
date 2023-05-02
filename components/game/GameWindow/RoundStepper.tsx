import { useGameContext } from "@/context/GameContext";
import { getTeamMembersPerRound } from "@/utils/game/getTeamMembersPerRound";
import {
  CheckOutlined,
  CircleOutlined,
  CloseOutlined,
  Pending,
} from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useMemo } from "react";

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
              <Typography>{playersPerRound[index]}</Typography>

              {index === 3 && game.playerIds.length >= 7 && (
                <Typography variant={"caption"}>2 Fails Needed</Typography>
              )}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
