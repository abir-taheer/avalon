import {
  useDialog,
  UseDialogComponent,
} from "@/components/dialog/queue/useDialog";
import {
  Button,
  Container,
  Stack,
  Typography,
  colors,
  capitalize,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Character, characters } from "@/types/schema/Character";
import { CharacterGuide } from "@/utils/game/CharacterGuide";
import classNames from "classnames";

export type CharacterGuideDialogProps = void;

const useStyles = makeStyles()((theme) => ({
  Root: {
    padding: theme.spacing(2),
  },
  LabelsList: {
    paddingLeft: theme.spacing(2),
    marginTop: 0,
  },
  LabelListItem: {
    color: colors.grey[500],
  },
  GoodCharacterItem: {
    color: colors.green[500],
  },
  EvilCharacterItem: {
    color: colors.red[500],
  },
}));

const GuideListItem = (character: Character) => {
  const entry = CharacterGuide[character];
  const isGood = entry.allegiance === "good";
  const { classes } = useStyles();

  return (
    <Stack key={character}>
      <Typography gutterBottom>
        {entry.isOptional && "Optional - "}
        {capitalize(character)}{" "}
        <Typography
          className={classNames({
            [classes.GoodCharacterItem]: isGood,
            [classes.EvilCharacterItem]: !isGood,
          })}
          component={"span"}
        >
          ({entry.allegiance})
        </Typography>
      </Typography>
      <ul className={classes.LabelsList}>
        {entry.descriptors.map((label) => (
          <li key={label} className={classes.LabelListItem}>
            <Typography variant={"caption"} color={"gray"}>
              {label}
            </Typography>
          </li>
        ))}
      </ul>
    </Stack>
  );
};

export const CharacterGuideDialog: UseDialogComponent<
  CharacterGuideDialogProps,
  null
> = ({ closeDialog }) => {
  const { classes } = useStyles();

  return (
    <Container maxWidth={"md"} className={classes.Root}>
      <Typography
        variant={"h3"}
        textAlign={"center"}
        color={"primary"}
        gutterBottom
      >
        Character Guide
      </Typography>

      <Stack spacing={1}>
        {characters.map(GuideListItem)}
        <Button
          variant={"outlined"}
          fullWidth
          onClick={() => closeDialog(null)}
        >
          Close
        </Button>
      </Stack>
    </Container>
  );
};

export const useCharacterGuideDialog = () => {
  return useDialog(CharacterGuideDialog);
};
