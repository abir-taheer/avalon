import { Game, optionalCharacters } from "@/types/schema";
import {
  capitalize,
  colors,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { CharacterAvatar } from "@/components/avatar/CharacterAvatar";
import { useMemo } from "react";
import { useRealtimeUserQuery } from "@/queries/useRealtimeUserQuery";

export type ViewOnlyOptionsPreviewProps = {
  game: Game;
};

export const ViewOnlyOptionsPreview = ({
  game,
}: ViewOnlyOptionsPreviewProps) => {
  // Sort it so that the characters that are enabled show up at the top
  const characters = useMemo(
    () =>
      Array.from(optionalCharacters).sort(
        (a, b) =>
          // True evaluates to 1 and false evaluates to 0
          Number(game.options.optionalCharacters[b]) -
          Number(game.options.optionalCharacters[a])
      ),
    [game.options.optionalCharacters]
  );

  const { data } = useRealtimeUserQuery({
    id: game.ownerId,
  });

  return (
    <Stack>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {characters.map((character) => {
          const isEnabled = game.options.optionalCharacters[character];
          const subtitleColor = isEnabled ? colors.green[500] : colors.red[500];

          return (
            <ListItem
              alignItems="flex-start"
              key={character}
              disabled={!isEnabled}
            >
              <ListItemAvatar>
                <CharacterAvatar character={character} width={50} height={50} />
              </ListItemAvatar>
              <ListItemText
                primary={capitalize(character)}
                secondary={
                  <Typography color={subtitleColor} variant={"body2"}>
                    {isEnabled ? "Enabled" : "Disabled"}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>

      <Typography variant={"subtitle2"}>
        Waiting for{" "}
        <Typography color={"primary"} component={"span"} variant={"inherit"}>
          {data?.displayName ?? "..."}
        </Typography>{" "}
        to start the game
      </Typography>
    </Stack>
  );
};
