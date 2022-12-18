import type { NextPage } from "next";
import {
  AnonymousLoginButton,
  GoogleLoginButton,
  SignOutButton,
} from "@/components/auth";
import { useAtomValue } from "jotai";
import { userAtom } from "@/atoms";

const Home: NextPage = () => {
  const user = useAtomValue(userAtom);

  return (
    <div>
      <GoogleLoginButton />
      <AnonymousLoginButton />
      <SignOutButton />
      {JSON.stringify(user)}
    </div>
  );
};

export default Home;
