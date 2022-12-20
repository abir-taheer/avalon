import {
  CheckboxProps as RMWCCheckboxProps,
  CheckboxHTMLProps,
  Checkbox as RMWCCheckbox,
} from "@rmwc/checkbox";

import "@material/checkbox/dist/mdc.checkbox.css";
import "@material/form-field/dist/mdc.form-field.css";
import "@material/ripple/dist/mdc.ripple.css";

export type CustomCheckboxProps = {};

export type CheckboxProps = RMWCCheckboxProps &
  CheckboxHTMLProps &
  CustomCheckboxProps;

export const Checkbox = (props: CheckboxProps) => {
  return <RMWCCheckbox {...props} />;
};
