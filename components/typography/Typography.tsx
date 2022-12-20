import {
  Typography as RMWCTypography,
  TypographyHTMLProps,
  TypographyProps as RMWCProps,
} from "@rmwc/typography";
import "@material/typography/dist/mdc.typography.css";

export type CustomTypographyProps = {};
export type TypographyProps = RMWCProps &
  TypographyHTMLProps &
  CustomTypographyProps;

export const Typography = (props: TypographyProps) => {
  return <RMWCTypography {...props} />;
};
