import { Character } from "@/types/schema";

// Avatar imports
import assassin from "@/assets/avatars/assassin.png";
import knight from "@/assets/avatars/knight.png";
import merlin from "@/assets/avatars/merlin.png";
import minion from "@/assets/avatars/minion.png";
import mordred from "@/assets/avatars/mordred.png";
import morgana from "@/assets/avatars/morgana.png";
import oberon from "@/assets/avatars/oberon.png";
import percival from "@/assets/avatars/percival.png";
import { OptimizedAvatar } from "@/components/avatar/OptimizedAvatar";

export type CharacterAvatarProps = {
  character: Character;
  width: number;
  height: number;
  className?: string;
};

const characterAvatarMap = {
  assassin,
  knight,
  merlin,
  minion,
  mordred,
  morgana,
  oberon,
  percival,
} as const;
export const CharacterAvatar = ({
  character,
  width,
  height,
  className,
}: CharacterAvatarProps) => {
  const image = characterAvatarMap[character];

  return (
    <OptimizedAvatar
      width={width}
      height={height}
      src={image.src}
      className={className}
      alt={character}
    />
  );
};
