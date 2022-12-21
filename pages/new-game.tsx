import { Typography } from "@mui/material";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";

const NewGame = () => {
  return (
    <div>
      <Typography variant={"h1"}>New Game</Typography>

      <NewGameForm />
    </div>
  );
};

export default NewGame;
