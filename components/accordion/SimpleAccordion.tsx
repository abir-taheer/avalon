import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
} from "@mui/material";
import { ReactNode, useEffect, useId, useState } from "react";

export type SimpleAccordionProps = {
  summary: ReactNode;
  children: ReactNode;
  renderDetailsIfHidden?: boolean;
  initialState?: boolean;
  accordionProps?: Partial<AccordionProps>;
  onOpen?: () => void;
  onClose?: () => void;
};

export const SimpleAccordion = ({
  summary,
  children,
  renderDetailsIfHidden,
  initialState,
  accordionProps,
  onOpen,
  onClose,
}: SimpleAccordionProps) => {
  const [open, setOpen] = useState(initialState ?? false);
  const id = useId();

  const toggle = () => {
    const nextState = !open;
    setOpen(nextState);

    if (nextState) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const shouldRenderDetails = Boolean(open || renderDetailsIfHidden);

  return (
    <Accordion
      expanded={open}
      onChange={toggle}
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
