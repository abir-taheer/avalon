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
