import type { NextPage } from "next";
import {
  AnonymousLoginButton,
  GoogleLoginButton,
  SignOutButton,
} from "@/components/auth";
import { useAtomValue } from "jotai";
import { authUserAtom } from "@/atoms";
import { useCurrentUserGameIdQuery } from "@/queries/useCurrentUserGameIdQuery";
import { GamePreviewCard } from "@/components/game/GamePreviewCard";
import { Stack, Typography } from "@mui/material";

const Home: NextPage = () => {
  const user = useAtomValue(authUserAtom);

  const { data } = useCurrentUserGameIdQuery();

  return (
    <div>
      <GoogleLoginButton />
      <AnonymousLoginButton />
      <SignOutButton />

      {user && (
        <Typography variant={"h1"}>
          You're currently signed in as {user.displayName}
        </Typography>
      )}

      {data?.id && (
        <Stack>
          <Typography variant={"h3"}>You're currently in this game</Typography>
          <GamePreviewCard id={data.id} />
        </Stack>
      )}
    </div>
  );
};

export default Home;
