import { Typography } from "@mui/material";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";
import { useNewGameForm } from "@/forms/NewGameForm/useNewGameForm";

const NewGame = () => {
  const form = useNewGameForm({
    onSubmit: console.log,
  });

  return (
    <div>
      <Typography variant={"h1"}>New Game</Typography>

      <NewGameForm form={form} />
    </div>
  );
};

export default NewGame;
