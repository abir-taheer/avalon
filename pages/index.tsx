import type { NextPage } from "next";
import {
  AnonymousLoginButton,
  GoogleLoginButton,
  SignOutButton,
} from "@/components/auth";
import { useAtomValue } from "jotai";
import { authUserAtom } from "@/atoms";
import { useEffect } from "react";
import { firstName } from "faker-en";

const Home: NextPage = () => {
  const user = useAtomValue(authUserAtom);

  useEffect(() => {
    const name = firstName();

    console.log(name);
  }, []);

  return (
    <div>
      <GoogleLoginButton />
      <AnonymousLoginButton />
      <SignOutButton />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Home;
