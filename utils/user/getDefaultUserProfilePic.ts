import { arrayElement } from "faker-en/utils/arrayElement";

export type GetDefaultUserProfilePicProps = {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
};

const backgroundColors = [
  "00b894",
  "6c5ce7",
  "00cec9",
  "ff7675",
  "74b9ff",
  "fd79a8",
];

export const getDefaultUserProfilePic = (
  props: GetDefaultUserProfilePicProps
) => {
  // The url module doesn't work on the client so use the browser url class
  const Url = globalThis.URL;
  const name = props.name || "User";
  const background = props.backgroundColor ?? arrayElement(backgroundColors);
  const size = props.size ?? 512;
  const color = props.color ?? "ffffff";
  const fontSize = props.fontSize ?? 0.35;
  const url = new Url("https://ui-avatars.com/api/");
  const params = url.searchParams;

  params.append("size", size.toString());
  params.append("font-size", fontSize.toString());
  params.append("color", color);
  params.append("name", name);
  params.append("background", background);

  return url.toString();
};
