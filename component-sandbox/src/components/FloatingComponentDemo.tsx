import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  useFloating,
  useInteractions,
  useClick,
  useHover,
  useDismiss,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  flip,
  shift,
  arrow,
  autoUpdate,
  useTransitionStyles,
  useMergeRefs
} from '@floating-ui/react';

// Styled components
const DemoContainer = styled.div`
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const DemoSection = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }

  &:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;

const ReferenceElement = styled.div`
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px dashed #ced4da;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const FloatingElement = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 15px;
  z-index: 1000;
  min-width: 200px;
  max-width: 300px;
`;

const ArrowElement = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  transform: rotate(45deg);
  z-index: -1;
`;

const CodeBlock = styled.pre`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  overflow-x: auto;
  margin: 10px 0;
  font-size: 14px;
  line-height: 1.5;
`;

const FloatingPopover: React.FC<{
  children: React.ReactNode;
  title: string;
  triggerType: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}> = ({ children, title, triggerType, placement = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'start' }),
      shift({ padding: 5 }),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate
  });
  
  const hover = useHover(context, {
    enabled: triggerType === 'hover',
    delay: { open: 300, close: 200 }
  });
  
  const click = useClick(context, {
    enabled: triggerType === 'click',
  });
  
  const dismiss = useDismiss(context);
  const role = useRole(context);
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role
  ]);

  // Add transitions
  const { styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0, transform: 'scale(0.95)' }
  });
  
  // Merge our ref with user's ref
  const mergedReferenceRef = useMergeRefs([refs.setReference, referenceRef]);
  
  return (
    <>
      <ReferenceElement
        ref={mergedReferenceRef}
        {...getReferenceProps()}
      >
        {title}
      </ReferenceElement>
      
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <FloatingElement
              ref={refs.setFloating}
              style={{...floatingStyles, ...styles}}
              {...getFloatingProps()}
            >
              <ArrowElement ref={arrowRef} />
              {children}
            </FloatingElement>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};


const FloatingMenu: React.FC = () => {
  const menuItems = [
    { label: 'Menu Item 1', onClick: () => console.log('Menu Item 1 clicked') },
    { label: 'Menu Item 2', onClick: () => console.log('Menu Item 2 clicked') },
    { label: 'Menu Item 3', onClick: () => console.log('Menu Item 3 clicked') },
  ];
  
  return (
    <FloatingPopover title="Click to Open Menu" triggerType="click">
      <h3>Floating Menu</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item, index) => (
          <li 
            key={index}
            style={{ 
              padding: '8px 12px',
              cursor: 'pointer',
              borderBottom: index < menuItems.length - 1 ? '1px solid #eee' : 'none',
              transition: 'background-color 0.2s',
              borderRadius: '4px'
            }}
            onClick={item.onClick}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </FloatingPopover>
  );
};

const FloatingTooltip: React.FC = () => {
  return (
    <FloatingPopover title="Hover for Tooltip" triggerType="hover" placement="top">
      <p style={{ margin: 0 }}>This is a tooltip with useful information!</p>
    </FloatingPopover>
  );
};

const FloatingPopoverWithActions: React.FC = () => {
  return (
    <FloatingPopover title="Click for Popover" triggerType="click" placement="right">
      <h3>Floating Popover</h3>
      <p>This is a popover with more detailed information and actions.</p>
      <Button onClick={() => console.log('Action clicked')}>
        Action Button
      </Button>
    </FloatingPopover>
  );
};

const FloatingComponentDemo: React.FC = () => {
  return (
    <DemoContainer>
      <h2>Floating Component Demo</h2>
      <p>
        This is a modern implementation of floating UI components using <code>@floating-ui/react</code>.
        These components provide proper focus management, accessibility, and positioning.
      </p>
      
      <DemoSection>
        <h3>Interactive Demos</h3>
        <p>Click or hover on the elements below to test the floating UI components:</p>
        
        <ButtonsContainer>
          <FloatingTooltip />
          <FloatingMenu />
          <FloatingPopoverWithActions />
        </ButtonsContainer>
      </DemoSection>
      
      <DemoSection>
        <h3>Security & Features</h3>
        <p>This implementation provides:</p>
        <ul>
          <li>Proper focus management</li>
          <li>Enhanced accessibility with ARIA attributes</li>
          <li>Smart positioning that adapts to viewport edges</li>
          <li>Smooth animations and transitions</li>
          <li>Avoids memory leaks via proper cleanup</li>
          <li>Uses sandboxed approach via context isolation</li>
        </ul>
      </DemoSection>
      
      <DemoSection>
        <h3>Implementation Example</h3>
        <p>Here's a simplified example of how these components are implemented:</p>
        
        <CodeBlock>{`const FloatingComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()]
  });
  
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useDismiss(context),
    useRole(context)
  ]);
  
  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference Element
      </button>
      
      {isOpen && (
        <FloatingFocusManager context={context}>
          <div 
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            Floating Content
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}`}</CodeBlock>
      </DemoSection>
    </DemoContainer>
  );
};

export default FloatingComponentDemo;
