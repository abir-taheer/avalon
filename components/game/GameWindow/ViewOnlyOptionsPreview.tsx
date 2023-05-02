import { CharacterAvatar } from "@/components/avatar/CharacterAvatar";
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
import { useMemo } from "react";

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

  return (
    <Stack gap={2}>
      <List dense>
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
    </Stack>
  );
};
