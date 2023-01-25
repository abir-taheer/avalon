import type { NextPage } from "next";
import { Divider, Stack } from "@mui/material";
import { AuthBanner } from "@/components/auth/AuthBanner";
import { ActiveGameBanner } from "@/components/game/ActiveGameBanner";

const Home: NextPage = () => {
  return (
    <Stack spacing={4} justifyContent={"center"} alignItems={"center"}>
      <AuthBanner />

      <Divider sx={{ height: 1, width: "80%" }} />

      <ActiveGameBanner />
    </Stack>
  );
};

export default Home;
