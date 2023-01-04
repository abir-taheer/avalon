import { withAuth } from "@/middleware";

export default withAuth((context) => {
  return context.user.displayName;
});
