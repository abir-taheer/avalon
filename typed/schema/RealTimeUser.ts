export type RealTimeUser = {
  uid: string;
  displayName?: string;
  photoURL?: string;
  active: boolean;
};

export const isRealTimeUser = (value: any): value is RealTimeUser => {
  return (
    typeof value === "object" &&
    typeof value.uid === "string" &&
    (value.displayName === undefined ||
      typeof value.displayName === "string") &&
    (value.photoURL === undefined || typeof value.photoURL === "string") &&
    typeof value.active === "boolean"
  );
};
