import React, { useState } from 'react';
import styled from 'styled-components';
import { FloatingTooltip } from '../FloatingTooltip';
import { FloatingMenu } from '../FloatingMenu';
import { FloatingPopover } from '../FloatingPopover';
import { FloatingCard } from '../FloatingCard';

const DemoContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
`;

const Section = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1e293b;
  margin: 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: #64748b;
  text-align: center;
  max-width: 600px;
  margin: 0;
`;

const DemoButton = styled.button`
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const FloatingDemo: React.FC = () => {
  const [count, setCount] = useState(0);

  const menuItems = [
    { id: '1', label: 'Edit Profile', onClick: () => console.log('Edit Profile') },
    { id: '2', label: 'Settings', onClick: () => console.log('Settings') },
    { id: 'divider1', isDivider: true },
    { id: '3', label: 'Help Center', onClick: () => console.log('Help Center') },
    { id: '4', label: 'Logout', onClick: () => console.log('Logout') }
  ];

  return (
    <DemoContainer>
      <Section>
        <Title>Floating UI Components Demo</Title>
        <Description>
          Explore our collection of floating UI components built with @floating-ui/react.
          Each component showcases different features and interactions.
        </Description>
      </Section>

      <Grid>
        <Card>
          <Title>Tooltip</Title>
          <FloatingTooltip
            content="This is a simple tooltip with an arrow"
            placement="top"
            showArrow
          >
            <DemoButton>Hover Me</DemoButton>
          </FloatingTooltip>
        </Card>

        <Card>
          <Title>Menu</Title>
          <FloatingMenu
            label="Open Menu"
            items={menuItems}
          />
        </Card>

        <Card>
          <Title>Popover</Title>
          <FloatingPopover
            trigger={<DemoButton>Click Me</DemoButton>}
            title="Interactive Popover"
            content={
              <div>
                <p>Click counter: {count}</p>
                <button onClick={() => setCount(c => c + 1)}>Increment</button>
              </div>
            }
            placement="right"
            showArrow
          />
        </Card>

        <Card>
          <Title>Card</Title>
          <FloatingCard
            title="Advanced Card"
            content="This card component features smooth animations, gradient background, and interactive elements."
            badge="New"
            placement="bottom"
            showArrow
            interactive
            openOnHover
            actionLabel="Try Me"
            onAction={() => alert('Action clicked!')}
          />
        </Card>
      </Grid>

      <Section>
        <Description>
          All components support various placements, animations, and interaction modes.
          They automatically adjust their position to stay within the viewport and
          handle edge cases gracefully.
        </Description>
      </Section>
    </DemoContainer>
  );
};

export default FloatingDemo;
