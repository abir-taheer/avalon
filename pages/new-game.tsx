import { Typography } from "@mui/material";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { useCreateGameMutation } from "@/mutations/useCreateGameMutation";
import { useCurrentUserGameId } from "@/queries/useCurrentUserGame";

const NewGame = () => {
  const { mutate } = useCreateGameMutation();

  const { data } = useCurrentUserGameId();

  const form = useNewGameForm({
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div>
      <Typography variant={"h1"}>New Game</Typography>

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <NewGameForm form={form} />
    </div>
  );
};

export default NewGame;
