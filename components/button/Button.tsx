import {
  Button as MaterialButton,
  ButtonProps as MaterialButtonProps,
  ButtonHTMLProps,
} from "@rmwc/button";
import "@material/button/dist/mdc.button.css";
import "@material/ripple/dist/mdc.ripple.css";

export type ButtonProps = {} & MaterialButtonProps & ButtonHTMLProps;

export const Button = (props: ButtonProps) => {
  return <MaterialButton {...props} />;
};
