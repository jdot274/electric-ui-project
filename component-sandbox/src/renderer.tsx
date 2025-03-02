import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FloatingComponentDemo from './components/FloatingComponentDemo';

// Types for our dependency data
interface DependencyData {
  electricUi: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  sandbox: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  error?: string;
}

interface NodeModulesLocations {
  electricUi: string | null;
  sandbox: string | null;
  error?: string;
}

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Section = styled.section`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const DependencyList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DependencyCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 10px;
`;

const DependencyName = styled.h3`
  margin: 0 0 10px 0;
  color: #3498db;
`;

const DependencyVersion = styled.div`
  font-family: monospace;
  color: #2ecc71;
`;

const LocationInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 10px;
  font-family: monospace;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
`;

// Main App component
const App: React.FC = () => {
  const [dependencies, setDependencies] = useState<DependencyData | null>(null);
  const [locations, setLocations] = useState<NodeModulesLocations | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dependencies
        const deps = await window.api.invoke<DependencyData>('get-dependencies');
        setDependencies(deps);
        
        // Fetch node_modules locations
        const locs = await window.api.invoke<NodeModulesLocations>('get-node-modules-location');
        setLocations(locs);
      } catch (err) {
        setError(`Error fetching data: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Component Sandbox</Title>
        </Header>
        <Section>
          <p>Loading dependency information...</p>
        </Section>
      </Container>
    );
  }

  if (error || dependencies?.error || locations?.error) {
    return (
      <Container>
        <Header>
          <Title>Component Sandbox</Title>
        </Header>
        <ErrorMessage>
          {error || dependencies?.error || locations?.error}
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Component Sandbox</Title>
      </Header>
      
      {/* Component Demo Section */}
      <Section>
        <SectionTitle>Component Demo</SectionTitle>
        <FloatingComponentDemo />
      </Section>
      
      <Section>
        <SectionTitle>Node Modules Locations</SectionTitle>
        {locations && (
          <>
            <h3>Electric UI Project</h3>
            <LocationInfo>
              {locations.electricUi || 'Not found'}
            </LocationInfo>
            
            <h3>Component Sandbox</h3>
            <LocationInfo>
              {locations.sandbox || 'Not found'}
            </LocationInfo>
          </>
        )}
      </Section>
      
      <Section>
        <SectionTitle>Electric UI Dependencies</SectionTitle>
        <DependencyList>
          <div>
            <h3>Runtime Dependencies</h3>
            {dependencies && Object.entries(dependencies.electricUi.dependencies).map(([name, version]) => (
              <DependencyCard key={name}>
                <DependencyName>{name}</DependencyName>
                <DependencyVersion>{version}</DependencyVersion>
              </DependencyCard>
            ))}
          </div>
          
          <div>
            <h3>Development Dependencies</h3>
            {dependencies && Object.entries(dependencies.electricUi.devDependencies).slice(0, 20).map(([name, version]) => (
              <DependencyCard key={name}>
                <DependencyName>{name}</DependencyName>
                <DependencyVersion>{version}</DependencyVersion>
              </DependencyCard>
            ))}
            {dependencies && Object.entries(dependencies.electricUi.devDependencies).length > 20 && (
              <p>...and {Object.entries(dependencies.electricUi.devDependencies).length - 20} more</p>
            )}
          </div>
        </DependencyList>
      </Section>
      
      <Section>
        <SectionTitle>Component Sandbox Dependencies</SectionTitle>
        <DependencyList>
          <div>
            <h3>Runtime Dependencies</h3>
            {dependencies && Object.entries(dependencies.sandbox.dependencies).map(([name, version]) => (
              <DependencyCard key={name}>
                <DependencyName>{name}</DependencyName>
                <DependencyVersion>{version}</DependencyVersion>
              </DependencyCard>
            ))}
          </div>
          
          <div>
            <h3>Development Dependencies</h3>
            {dependencies && Object.entries(dependencies.sandbox.devDependencies).map(([name, version]) => (
              <DependencyCard key={name}>
                <DependencyName>{name}</DependencyName>
                <DependencyVersion>{version}</DependencyVersion>
              </DependencyCard>
            ))}
          </div>
        </DependencyList>
      </Section>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
