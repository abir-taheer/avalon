import { Stack } from "@mui/material";
import { Game } from "@/types/schema";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useAuth } from "@/hooks";
import { ViewOnlyOptionsPreview } from "@/components/game/GameWindow/ViewOnlyOptionsPreview";

export type OptionsPreviewProps = {
  game: Game;
};

export const OptionsPreview = ({ game }: OptionsPreviewProps) => {
  const form = useNewGameForm({
    onSubmit: () => {},
    initialValues: game.options,
  });

  const { user } = useAuth();

  const isOwner = user?.uid === game.ownerId;

  return (
    <Stack>
      {isOwner ? (
        <NewGameForm form={form} />
      ) : (
        <ViewOnlyOptionsPreview game={game} />
      )}
    </Stack>
  );
};
