import React from 'react';
import styled from 'styled-components';
import { FloatingDemo } from '../../components/FloatingDemo';

const PageContainer = styled.div`
  padding: 20px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #1e293b;
  margin: 0 0 10px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  margin: 0;
`;

export const FloatingUIPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <Title>Floating UI Components</Title>
        <Subtitle>
          A showcase of advanced floating UI components built with @floating-ui/react,
          featuring tooltips, popovers, menus, and interactive cards.
        </Subtitle>
      </Header>
      <FloatingDemo />
    </PageContainer>
  );
};

export default FloatingUIPage;
