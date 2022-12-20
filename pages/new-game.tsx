import { Typography } from "@/components";
import { NewGameForm } from "@/forms/NewGameForm/NewGameForm";

const NewGame = () => {
  return (
    <div>
      <Typography use={"headline1"}>New Game</Typography>

      <NewGameForm />
    </div>
  );
};

export default NewGame;
