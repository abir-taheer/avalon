import { createEmotionSsrAdvancedApproach } from "tss-react/next";

const { withAppEmotionCache, augmentDocumentWithEmotionCache } =
  createEmotionSsrAdvancedApproach({
    key: "css",
  });

export { withAppEmotionCache, augmentDocumentWithEmotionCache };
