import { Stack } from "@mui/material";
import { Game } from "@/types/schema";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";

export type OptionsPreviewProps = {
  game: Game;
};

export const OptionsPreview = ({ game }: OptionsPreviewProps) => {
  const form = useNewGameForm({
    onSubmit: () => {},
    initialValues: game.options,
  });

  return (
    <Stack>
      <NewGameForm form={form} />
    </Stack>
  );
};
