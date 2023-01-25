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
import { Divider, Stack, Typography } from "@mui/material";
import { AuthBanner } from "@/components/auth/AuthBanner";
import { ActiveGameBanner } from "@/components/game/ActiveGameBanner";

const Home: NextPage = () => {
  const user = useAtomValue(authUserAtom);

  const { data } = useCurrentUserGameIdQuery();

  return (
    <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
      <AuthBanner />

      <Divider sx={{ height: 1, width: "80%" }} />

      <ActiveGameBanner />
    </Stack>
  );
};

export default Home;
