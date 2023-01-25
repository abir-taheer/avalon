import { ReactNode, useId, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export type SimpleAccordionProps = {
  summary: ReactNode;
  children: ReactNode;
  renderDetailsIfHidden?: boolean;
  initialState?: boolean;
};

export const SimpleAccordion = ({
  summary,
  children,
  renderDetailsIfHidden,
  initialState,
}: SimpleAccordionProps) => {
  const [open, setOpen] = useState(initialState ?? false);
  const id = useId();

  const shouldRenderDetails = Boolean(open || renderDetailsIfHidden);

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary expandIcon={<ExpandMore />} id={id}>
        {summary}
      </AccordionSummary>
      <AccordionDetails>{shouldRenderDetails && children}</AccordionDetails>
    </Accordion>
  );
};
