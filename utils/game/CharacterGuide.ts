import { Character } from "@/types/schema/Character";

export type Allegiance = "evil" | "good";

export type CharacterGuideValue = {
  allegiance: Allegiance;
  isOptional: boolean;
  descriptors: string[];
};

export const CharacterGuide: Record<Character, CharacterGuideValue> = {
  knight: {
    allegiance: "good",
    isOptional: false,
    descriptors: ["No special abilities", "Does not know anyone's identity"],
  },
  minion: {
    allegiance: "evil",
    isOptional: false,
    descriptors: ["No special abilities", "Does not know anyone's identity"],
  },

  merlin: {
    allegiance: "good",
    isOptional: true,
    descriptors: ["Knows the identity of the evil players"],
  },
  assassin: {
    allegiance: "evil",
    isOptional: true,
    descriptors: [
      "If good team wins, assassin has a chance to steal the victory by guessing merlin's identity",
    ],
  },
  mordred: {
    allegiance: "evil",
    isOptional: true,
    descriptors: ["His evil identity is hidden from merlin"],
  },

  percival: {
    allegiance: "good",
    isOptional: true,
    descriptors: [
      "Knows the identity of merlin",
      "When morgana is enabled, percival knows the identity of both Morgana and Merlin but does not know which is either.",
    ],
  },
  morgana: {
    allegiance: "evil",
    isOptional: true,
    descriptors: ["Appears to be Merlin to Percival"],
  },

  oberon: {
    allegiance: "evil",
    isOptional: true,
    descriptors: [
      "Does not know the identity of the other evil players",
      "Makes the game harder for the evil team",
    ],
  },
};
