import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  useDeviceConnect,
  useDeviceConnectionRequested,
  useDeviceDisconnect,
  useDeviceID,
  useDeviceMetadata,
  useDeadline,
} from '@electricui/components-core';
import { Intent } from '@blueprintjs/core';

const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px rgba(var(--glow-color), 0.5); }
  50% { box-shadow: 0 0 20px rgba(var(--glow-color), 0.7); }
  100% { box-shadow: 0 0 10px rgba(var(--glow-color), 0.5); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const ConnectionContainer = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 25px;
  color: white;
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.2),
    0 0 1px 0 rgba(255, 255, 255, 0.3) inset,
    0 0 20px -1px rgba(255, 255, 255, 0.1);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 32px -1px rgba(0, 0, 0, 0.3),
      0 0 1px 0 rgba(255, 255, 255, 0.3) inset,
      0 0 25px -1px rgba(255, 255, 255, 0.15);
  }
`;

const GlassPanel = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatusHeader = styled(GlassPanel)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StatusTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(135deg, #fff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusIndicator = styled.div<{ $status: 'connected' | 'disconnected' | 'connecting' }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;
  --glow-color: ${props => {
    switch (props.$status) {
      case 'connected':
        return '46, 213, 115';
      case 'connecting':
        return '255, 199, 0';
      case 'disconnected':
        return '255, 71, 87';
    }
  }};
  background-color: rgb(var(--glow-color));
  animation: ${glowPulse} 2s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    filter: blur(1px);
  }
`;

const DeviceInfo = styled(GlassPanel)`
  margin: 20px 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.03)
  );
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

const Label = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const Value = styled.span`
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ActionButton = styled.button<{ $intent?: Intent }>`
  position: relative;
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  background: ${props => {
    switch (props.$intent) {
      case Intent.SUCCESS:
        return 'linear-gradient(135deg, #2ecc71, #27ae60)';
      case Intent.DANGER:
        return 'linear-gradient(135deg, #e74c3c, #c0392b)';
      default:
        return 'linear-gradient(135deg, #3498db, #2980b9)';
    }
  }};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: ${shimmer} 1.5s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

export interface DeviceConnectionProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const DeviceConnection: React.FC<DeviceConnectionProps> = ({
  onConnect,
  onDisconnect,
}) => {
  const deviceID = useDeviceID();
  const metadata = useDeviceMetadata();
  const connect = useDeviceConnect();
  const disconnect = useDeviceDisconnect();
  const connectionRequested = useDeviceConnectionRequested();
  const getDeadline = useDeadline();

  const handleConnect = async () => {
    const cancellationToken = getDeadline();
    try {
      await connect(cancellationToken);
      onConnect?.();
    } catch (err) {
      if (!cancellationToken.caused(err)) {
        console.error('Failed to connect:', err);
      }
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      onDisconnect?.();
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  const getConnectionStatus = () => {
    if (connectionRequested) return 'connected';
    if (metadata?.connectionState === 'connecting') return 'connecting';
    return 'disconnected';
  };

  return (
    <ConnectionContainer>
      <StatusHeader>
        <StatusTitle>Device Connection</StatusTitle>
        <StatusIndicator $status={getConnectionStatus()} />
      </StatusHeader>

      <DeviceInfo>
        <InfoRow>
          <Label>Device ID</Label>
          <Value>{deviceID || 'Not Connected'}</Value>
        </InfoRow>
        <InfoRow>
          <Label>Status</Label>
          <Value>
            {connectionRequested
              ? 'Connected'
              : metadata?.connectionState || 'Disconnected'}
          </Value>
        </InfoRow>
        {metadata?.connectionState === 'connected' && (
          <>
            <InfoRow>
              <Label>Transport</Label>
              <Value>{metadata.transport}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Baudrate</Label>
              <Value>{metadata.baudrate || 'N/A'}</Value>
            </InfoRow>
          </>
        )}
      </DeviceInfo>

      {connectionRequested ? (
        <ActionButton $intent={Intent.DANGER} onClick={handleDisconnect}>
          Disconnect Device
        </ActionButton>
      ) : (
        <ActionButton $intent={Intent.SUCCESS} onClick={handleConnect}>
          Connect Device
        </ActionButton>
      )}
    </ConnectionContainer>
  );
};

export default DeviceConnection;
