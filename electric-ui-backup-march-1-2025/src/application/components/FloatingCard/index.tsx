import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  FloatingArrow,
  arrow,
  size,
  useClick,
  useMergeRefs,
  inline,
  Placement
} from '@floating-ui/react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const CardContainer = styled.div<{ $isInteractive: boolean }>`
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.3);
  width: 300px;
  cursor: ${props => props.$isInteractive ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.$isInteractive ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.$isInteractive ? '0 15px 30px -5px rgba(79, 70, 229, 0.4)' : '0 10px 25px -5px rgba(79, 70, 229, 0.3)'};
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
`;

const CardContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.9;
`;

const TriggerButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Badge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
  vertical-align: middle;
`;

const ActionButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

interface FloatingCardProps {
  title: string;
  content: React.ReactNode;
  badge?: string;
  placement?: Placement;
  showArrow?: boolean;
  interactive?: boolean;
  trigger?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  openOnHover?: boolean;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  title,
  content,
  badge,
  placement = 'bottom',
  showArrow = true,
  interactive = true,
  trigger,
  onAction,
  actionLabel = 'Learn More',
  openOnHover = false
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
    placement: finalPlacement
  } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(12),
      flip({
        fallbackAxisSideDirection: 'end',
        padding: 8
      }),
      shift({ padding: 8 }),
      inline(),
      size({
        apply({ availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`
          });
        },
        padding: 8
      }),
      showArrow && arrow({ element: arrowRef })
    ].filter(Boolean),
    whileElementsMounted: autoUpdate
  });

  const hover = useHover(context, {
    enabled: openOnHover,
    delay: { open: 75, close: 150 }
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const click = useClick(context, {
    enabled: !openOnHover
  });
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    click,
    role
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0.95)'
    },
    open: {
      opacity: 1,
      transform: 'scale(1)'
    },
    close: {
      opacity: 0,
      transform: 'scale(0.95)'
    }
  });

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, {
          ref: refs.setReference,
          ...getReferenceProps()
        })
      ) : (
        <TriggerButton ref={refs.setReference} {...getReferenceProps()}>
          Open Card
        </TriggerButton>
      )}
      {isMounted && (
        <CardContainer
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            ...styles
          }}
          $isInteractive={interactive}
          {...getFloatingProps()}
        >
          {showArrow && (
            <FloatingArrow
              ref={arrowRef}
              context={context}
              fill="#6366f1"
              width={12}
              height={6}
            />
          )}
          <CardTitle>
            {title}
            {badge && <Badge>{badge}</Badge>}
          </CardTitle>
          <CardContent>{content}</CardContent>
          {onAction && (
            <ActionButton onClick={onAction}>
              {actionLabel}
            </ActionButton>
          )}
        </CardContainer>
      )}
    </>
  );
};

export default FloatingCard;
