export const RECAPTCHA_SITE_KEY: string =
  process.env.NEXT_APP_CAPTCHA_SITE_KEY ||
  "6LdePZUjAAAAAFm6G35heJCelM1V3-PTJDA8w0Ai";

export const FIREBASE_CONFIG = process.env.FIREBASE_CONFIG
  ? JSON.parse(
      Buffer.from(process.env.FIREBASE_CONFIG, "base64").toString("utf-8")
    )
  : null;
