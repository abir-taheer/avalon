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
import { useAPI } from "@/hooks/api/useAPI";
import { LockTwoTone } from "@mui/icons-material";
import { useCurrentUserGameId } from "@/queries/useCurrentUserGame";

const Home: NextPage = () => {
  const user = useAtomValue(authUserAtom);

  const { data } = useCurrentUserGameId();

  return (
    <div>
      <GoogleLoginButton />
      <AnonymousLoginButton />
      <SignOutButton />
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
