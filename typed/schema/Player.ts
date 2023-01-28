export type Player = {
  id: string;
  name: string;
  profilePicture?: string | null;
};

export const isPlayer = (value: any): value is Player => {
  return (
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    (value.profilePicture === undefined ||
      value.profilePicture === null ||
      typeof value.profilePicture === "string")
  );
};
