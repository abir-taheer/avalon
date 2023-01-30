export const getIsSigningOut = () => {
  return globalThis.sessionStorage?.getItem("signingOut") === "true";
};

export const setIsSigningOut = (value: boolean) => {
  return global.sessionStorage?.setItem("signingOut", value.toString());
};
