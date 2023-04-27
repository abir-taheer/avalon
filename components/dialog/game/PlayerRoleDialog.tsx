import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import {
  Container,
  Stack,
  Typography,
  colors,
  LinearProgress,
  capitalize,
  Divider,
  Button,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { useRoleQuery } from "@/queries/useRoleQuery";
import { Game } from "@/types/schema";
import { CharacterAvatar } from "@/components/avatar/CharacterAvatar";
import { CharacterGuide } from "@/utils/game/CharacterGuide";
import { FlexCenter } from "@/components/flex/FlexCenter";
import { PlayerName } from "@/components/auth/PlayerName";

export type RoleDialogProps = {
  game: Game;
};

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
    width: 450,
    maxWidth: "90vw",
  },
}));

export const RoleDialog: UseDialogComponent<RoleDialogProps, null> = ({
  closeDialog,
  game,
}) => {
  const { classes } = useStyles();
  const { data, isLoading } = useRoleQuery({ game: game.id });

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography
        variant={"h3"}
        textAlign={"center"}
        color={"secondary"}
        gutterBottom
      >
        Your Role
      </Typography>

      <Stack spacing={2}>
        {isLoading && <LinearProgress />}

        {data && (
          <>
            <FlexCenter>
              <CharacterAvatar character={data.role} width={150} height={150} />
            </FlexCenter>

            <Typography textAlign={"center"}>
              {capitalize(data.role)}
            </Typography>

            <Typography
              color={
                CharacterGuide[data.role].allegiance === "good"
                  ? colors.green[500]
                  : colors.red[500]
              }
              align={"center"}
            >
              {CharacterGuide[data.role].allegiance}
            </Typography>

            {CharacterGuide[data.role].descriptors.map((label) => (
              <Typography variant={"caption"} color={"gray"} key={label}>
                {label}
              </Typography>
            ))}

            <Divider />

            {data.context.evilRoles.length > 0 && (
              <>
                <Typography variant={"caption"}>
                  You know that the following players are evil
                </Typography>

                {data.context.evilRoles.map((item) => (
                  <Typography
                    key={item.playerId}
                    variant={"caption"}
                    color={"red"}
                  >
                    <PlayerName playerId={item.playerId} fontWeight={500} />
                  </Typography>
                ))}
              </>
            )}

            {data.context.merlinRoles.length > 0 && (
              <>
                <Typography variant={"caption"}>
                  You know that{" "}
                  {data.context.merlinRoles.length > 1 ? (
                    <>
                      one of the following players is{" "}
                      <Typography
                        variant={"inherit"}
                        component={"span"}
                        color={colors.red[500]}
                      >
                        morgana
                      </Typography>{" "}
                      and the other{" "}
                    </>
                  ) : (
                    "the following player"
                  )}{" "}
                  is{" "}
                  <Typography
                    variant={"inherit"}
                    component={"span"}
                    color={colors.green[500]}
                  >
                    merlin
                  </Typography>
                </Typography>

                {data.context.merlinRoles.map((item) => (
                  <Typography
                    key={item.playerId}
                    variant={"caption"}
                    color={colors.green[500]}
                  >
                    <PlayerName playerId={item.playerId} fontWeight={500} />
                  </Typography>
                ))}
              </>
            )}
          </>
        )}

        <Button variant={"outlined"} onClick={() => closeDialog(null)}>
          Close
        </Button>
      </Stack>
    </Container>
  );
};

export const useRoleDialog = () => {
  return useDialog(RoleDialog);
};
