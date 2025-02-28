import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
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
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react';

const encryptionFlow = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(103, 76, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(103, 76, 255, 0.4); }
  100% { box-shadow: 0 0 20px rgba(103, 76, 255, 0.2); }
`;

const dataStream = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const TriggerButton = styled.button`
  background: linear-gradient(135deg, #2d1a42 0%, #1a1f35 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(103, 76, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${encryptionFlow} 3s linear infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SecurePanel = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1a1f35 0%, #2d1a42 100%);
  border-radius: 20px;
  padding: 24px;
  color: white;
  width: 400px;
  overflow: hidden;
  animation: ${glowPulse} 4s infinite ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(103, 76, 255, 0.3),
      transparent
    );
  }
`;

const EncryptionPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      45deg,
      rgba(103, 76, 255, 0.03) 0px,
      rgba(103, 76, 255, 0.03) 2px,
      transparent 2px,
      transparent 8px
    );
  pointer-events: none;
`;

const DataStream = styled.div`
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(103, 76, 255, 0.5),
    transparent
  );
  animation: ${dataStream} 2s linear infinite;
  opacity: 0.5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SecurityBadge = styled.div`
  padding: 6px 12px;
  background: rgba(46, 213, 115, 0.15);
  color: #2ed573;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 8px currentColor;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(103, 76, 255, 0.1);
`;

interface FloatingSecurePanelProps {
  title?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

export const FloatingSecurePanel: React.FC<FloatingSecurePanelProps> = ({
  title = 'Secure Content',
  trigger,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(12),
      flip({ padding: 16 }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
    open: {
      opacity: 1,
      transform: 'scale(1)',
    },
    close: {
      opacity: 0,
      transform: 'scale(0.95)',
    },
  });

  return (
    <>
      {trigger ? (
        React.cloneElement(trigger as React.ReactElement, {
          ref: refs.setReference,
          ...getReferenceProps(),
        })
      ) : (
        <TriggerButton ref={refs.setReference} {...getReferenceProps()}>
          View Secure Content
        </TriggerButton>
      )}

      {isMounted && (
        <FloatingPortal>
          <SecurePanel
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              ...styles,
            }}
            {...getFloatingProps()}
          >
            <EncryptionPattern />
            {[...Array(5)].map((_, i) => (
              <DataStream
                key={i}
                style={{
                  left: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
            
            <Header>
              <Title>{title}</Title>
              <SecurityBadge>Encrypted</SecurityBadge>
            </Header>

            <Content>{children}</Content>
          </SecurePanel>
        </FloatingPortal>
      )}
    </>
  );
};

export default FloatingSecurePanel;
