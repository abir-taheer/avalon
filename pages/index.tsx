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
import { useAPI } from "@/hooks/useAPI";
import { LockTwoTone } from "@mui/icons-material";

const Home: NextPage = () => {
  const user = useAtomValue(authUserAtom);

  const api = useAPI();

  useEffect(() => {
    const name = firstName();

    api.get("/room").then(console.log);

    console.log(name);
  }, [api]);

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
