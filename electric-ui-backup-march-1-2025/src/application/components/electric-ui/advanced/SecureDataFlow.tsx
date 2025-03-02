import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDeviceState, useDeviceMetadata } from '@electricui/components-core';

const encryptPulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; filter: brightness(1); }
  50% { transform: scale(1.02); opacity: 1; filter: brightness(1.2); }
  100% { transform: scale(1); opacity: 0.8; filter: brightness(1); }
`;

const particleFloat = keyframes`
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: linear-gradient(135deg, #1a1f35 0%, #2d1a42 100%);
  border-radius: 24px;
  padding: 30px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 100px rgba(103, 76, 255, 0.1),
    0 0 1px rgba(255, 255, 255, 0.1) inset;

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
      rgba(103, 76, 255, 0.2),
      transparent
    );
  }
`;

const EncryptionLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    repeating-linear-gradient(
      45deg,
      rgba(103, 76, 255, 0.05) 0px,
      rgba(103, 76, 255, 0.05) 2px,
      transparent 2px,
      transparent 8px
    );
  animation: ${encryptPulse} 4s ease-in-out infinite;
  pointer-events: none;
`;

const DataParticle = styled.div<{ $delay: number; $x: number }>`
  position: absolute;
  bottom: -10px;
  left: ${props => props.$x}%;
  width: 6px;
  height: 6px;
  background: rgba(103, 76, 255, 0.8);
  border-radius: 50%;
  animation: ${particleFloat} 3s ease-out infinite;
  animation-delay: ${props => props.$delay}s;
  filter: blur(1px);
`;

const ContentArea = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 10px rgba(103, 76, 255, 0.3);
`;

const StatusBadge = styled.div<{ $isSecure: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.$isSecure ? 
    'rgba(46, 213, 115, 0.15)' : 
    'rgba(255, 71, 87, 0.15)'};
  color: ${props => props.$isSecure ? 
    '#2ed573' : 
    '#ff4757'};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 10px currentColor;
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: auto;
`;

const DataCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(103, 76, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(103, 76, 255, 0.2);
  }
`;

const DataLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
`;

const DataValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 2px 10px rgba(103, 76, 255, 0.3);
`;

interface SecureDataFlowProps {
  title?: string;
  isSecure?: boolean;
  data?: {
    [key: string]: number | string;
  };
}

export const SecureDataFlow: React.FC<SecureDataFlowProps> = ({
  title = 'Secure Data Flow',
  isSecure = true,
  data = {},
}) => {
  const particleCount = 15;
  const deviceState = useDeviceState();
  const metadata = useDeviceMetadata();

  return (
    <Container>
      <EncryptionLayer />
      {[...Array(particleCount)].map((_, i) => (
        <DataParticle 
          key={i}
          $delay={i * (3 / particleCount)}
          $x={Math.random() * 100}
        />
      ))}
      
      <ContentArea>
        <Header>
          <Title>{title}</Title>
          <StatusBadge $isSecure={isSecure}>
            {isSecure ? 'Secure Connection' : 'Insecure Connection'}
          </StatusBadge>
        </Header>

        <DataGrid>
          {Object.entries(data).map(([key, value]) => (
            <DataCard key={key}>
              <DataLabel>{key}</DataLabel>
              <DataValue>{value}</DataValue>
            </DataCard>
          ))}
        </DataGrid>
      </ContentArea>
    </Container>
  );
};

export default SecureDataFlow;
