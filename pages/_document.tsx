import { Html, Head, Main, NextScript } from "next/document";
import { augmentDocumentWithEmotionCache } from "@/utils/tss";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// We have to do this so jss works with ssr
// TLAs:
// - SSR: Server Side Rendering
// - JSS: CSS in JS package we use for styling
augmentDocumentWithEmotionCache(Document);
