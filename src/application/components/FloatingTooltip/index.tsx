import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingArrow,
  Placement,
} from '@floating-ui/react';
import styled from 'styled-components';

// Styled components for our tooltip
const TooltipContainer = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  max-width: 250px;
  z-index: 1000;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.2));
`;

const ArrowElement = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
`;

interface FloatingTooltipProps {
  content: React.ReactNode;
  placement?: Placement;
  children: React.ReactElement;
  offset?: number;
  showArrow?: boolean;
}

export const FloatingTooltip: React.FC<FloatingTooltipProps> = ({
  content,
  placement = 'top',
  children,
  offset: offsetValue = 8,
  showArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const {
    x,
    y,
    strategy,
    refs,
    context,
    middlewareData,
  } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(offsetValue),
      flip(),
      shift({ padding: 8 }),
      showArrow && arrow({ element: arrowRef }),
    ].filter(Boolean),
    whileElementsMounted: autoUpdate,
  });

  // Event listeners to show/hide the tooltip
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  // Merge all the interactions into a single object
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Calculate arrow position
  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]];

  return (
    <>
      {React.cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      <TooltipContainer
        ref={refs.setFloating}
        $isOpen={isOpen}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        {...getFloatingProps()}
      >
        {content}
        {showArrow && (
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="#333"
            width={8}
            height={8}
          />
        )}
      </TooltipContainer>
    </>
  );
};

export default FloatingTooltip;
