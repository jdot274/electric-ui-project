import React, { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  FloatingArrow,
  arrow,
  Placement,
} from '@floating-ui/react';
import styled from 'styled-components';

const TriggerButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5b4bc4;
  }
`;

const PopoverContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px;
  width: 300px;
  z-index: 1000;
`;

const PopoverHeader = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

const PopoverTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const PopoverContent = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.5;
`;

const PopoverFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #eaeaea;
`;

const PopoverButton = styled.button<{ $primary?: boolean }>`
  background-color: ${props => props.$primary ? '#6c5ce7' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#6c5ce7'};
  border: ${props => props.$primary ? 'none' : '1px solid #6c5ce7'};
  border-radius: 4px;
  padding: 8px 12px;
  margin-left: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$primary ? '#5b4bc4' : 'rgba(108, 92, 231, 0.1)'};
  }
`;

interface FloatingPopoverProps {
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
  placement?: Placement;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showArrow?: boolean;
}

export const FloatingPopover: React.FC<FloatingPopoverProps> = ({
  trigger,
  title,
  content,
  placement = 'bottom',
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showArrow = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = React.useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(12),
      flip({ padding: 16 }),
      shift(),
      showArrow && arrow({ element: arrowRef }),
    ].filter(Boolean),
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        ref: refs.setReference,
        ...getReferenceProps(),
      })}
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <PopoverContainer
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {showArrow && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  fill="white"
                  stroke="#eaeaea"
                  strokeWidth={1}
                />
              )}
              <PopoverHeader>
                <PopoverTitle>{title}</PopoverTitle>
              </PopoverHeader>
              <PopoverContent>{content}</PopoverContent>
              {(onConfirm || onCancel) && (
                <PopoverFooter>
                  {onCancel && (
                    <PopoverButton onClick={handleCancel}>
                      {cancelText}
                    </PopoverButton>
                  )}
                  {onConfirm && (
                    <PopoverButton $primary onClick={handleConfirm}>
                      {confirmText}
                    </PopoverButton>
                  )}
                </PopoverFooter>
              )}
            </PopoverContainer>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default FloatingPopover;
