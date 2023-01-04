import { app } from "@/firebase/admin";
import { withAppCheck } from "@/middleware";
import { withContext } from "@/middleware/withContext";

export default withContext((context) => {
  const { user, authRequired } = context;

  const auth = app.auth();

  return context.user!;
});
