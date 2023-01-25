import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";
import { AuthenticatedBanner } from "@/components/auth/AuthenticatedBanner";
import { UnauthenticatedBanner } from "@/components/auth/UnauthenticatedBanner";

export const AuthBanner = () => {
  const user = useAtomValue(userAtom);

  const signedIn = Boolean(user);

  return signedIn ? <AuthenticatedBanner /> : <UnauthenticatedBanner />;
};
