import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";
import { useCreateGameMutation } from "@/mutations/useCreateGameMutation";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const NewGame = () => {
  const { mutateAsync, isLoading } = useCreateGameMutation();
  const router = useRouter();

  const form = useNewGameForm({
    onSubmit: async (values) => {
      try {
        const { id } = await mutateAsync(values);
        await router.push(`/game/${id}`);
      } catch (e) {
        // TODO show dialog with specific error handling
      }
    },
  });

  return (
    <div>
      <Typography variant={"h1"}>New Game</Typography>
      <NewGameForm disabled={isLoading} form={form} />
    </div>
  );
};

export default NewGame;
