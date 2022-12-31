import type { NextPage } from "next";
import {
  AnonymousLoginButton,
  GoogleLoginButton,
  SignOutButton,
} from "@/components/auth";
import { useAtomValue } from "jotai";
import { userAtom, currentGameIdAtom, currentGameAtom } from "@/atoms";
import { useEffect } from "react";
import { firstName } from "faker-en";

const Home: NextPage = () => {
  const user = useAtomValue(userAtom);
  const current = useAtomValue(currentGameIdAtom);
  const currentGame = useAtomValue(currentGameAtom);

  useEffect(() => {
    const name = firstName();

    console.log(name);
  }, []);

  return (
    <div>
      <GoogleLoginButton />
      <AnonymousLoginButton />
      <SignOutButton />
      <pre>
        {JSON.stringify(user, null, 2)}
        {JSON.stringify(current, null, 2)}
        {JSON.stringify(currentGame, null, 2)}
      </pre>
    </div>
  );
};

export default Home;
