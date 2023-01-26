import { userAtom } from "@/atoms";
import { AuthenticatedBanner } from "@/components/auth/AuthenticatedBanner";
import { UnauthenticatedBanner } from "@/components/auth/UnauthenticatedBanner";
import { useAtomValue } from "jotai";

export const AuthBanner = () => {
  const user = useAtomValue(userAtom);

  const signedIn = Boolean(user);

  return signedIn ? <AuthenticatedBanner /> : <UnauthenticatedBanner />;
};
