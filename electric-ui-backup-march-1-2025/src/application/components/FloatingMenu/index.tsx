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
} from '@floating-ui/react';
import styled from 'styled-components';

const MenuButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a80d2;
  }
`;

const MenuContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  width: 200px;
  z-index: 1000;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  background: none;
  border: none;
  padding: 10px 15px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: #eaeaea;
  margin: 8px 0;
`;

interface FloatingMenuProps {
  label: string;
  items: Array<{
    id: string;
    label: string;
    onClick: () => void;
    isDivider?: boolean;
  }>;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip({ padding: 16 }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <MenuButton ref={refs.setReference} {...getReferenceProps()}>
        {label}
      </MenuButton>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <MenuContainer
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {items.map((item) => 
                item.isDivider ? (
                  <MenuDivider key={item.id} />
                ) : (
                  <MenuItem 
                    key={item.id} 
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                )
              )}
            </MenuContainer>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};

export default FloatingMenu;
