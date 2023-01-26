import { ReactNode, useId, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export type SimpleAccordionProps = {
  summary: ReactNode;
  children: ReactNode;
  renderDetailsIfHidden?: boolean;
  initialState?: boolean;
  accordionProps?: Partial<AccordionProps>;
};

export const SimpleAccordion = ({
  summary,
  children,
  renderDetailsIfHidden,
  initialState,
  accordionProps,
}: SimpleAccordionProps) => {
  const [open, setOpen] = useState(initialState ?? false);
  const id = useId();

  const shouldRenderDetails = Boolean(open || renderDetailsIfHidden);

  return (
    <Accordion
      expanded={open}
      onChange={() => setOpen(!open)}
      elevation={0}
      {...accordionProps}
    >
      <AccordionSummary expandIcon={<ExpandMore />} id={id}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>{shouldRenderDetails && children}</AccordionDetails>
    </Accordion>
  );
};
