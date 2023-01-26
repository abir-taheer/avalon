import styled from "@emotion/styled";

export type FlexDivProps = {
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
  flexGrow?: number;
  width?: string | number;
};

export const FlexDiv = styled.div<FlexDivProps>((props) => ({
  display: "flex",
  alignItems: props.alignItems,
  justifyContent: props.justifyContent,
  flexGrow: props.flexGrow,
  width: props.width,
}));
