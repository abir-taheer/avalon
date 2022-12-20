import { Checkbox } from "@/components";
import { useNewGameForm } from "./useNewGameForm";

export const NewGameForm = () => {
  const { values, setFieldValue } = useNewGameForm();

  return (
    <form>
      <Checkbox
        label="Assassin"
        checked={values.assassin}
        onChange={(ev) => setFieldValue("assassin", ev.currentTarget.checked)}
      />
    </form>
  );
};
