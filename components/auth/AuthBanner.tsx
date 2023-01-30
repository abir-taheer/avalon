import { AuthenticatedBanner } from "@/components/auth/AuthenticatedBanner";
import { UnauthenticatedBanner } from "@/components/auth/UnauthenticatedBanner";
import { useAuth } from "@/hooks/auth/useAuth";

export const AuthBanner = () => {
  const { user } = useAuth();

  const signedIn = Boolean(user);

  return signedIn ? <AuthenticatedBanner /> : <UnauthenticatedBanner />;
};
