# Component Sandbox

A standalone application for exploring and testing UI components from the Electric UI project. This sandbox provides a secure playground environment where you can:

- View all installed npm packages and their locations
- Test components in isolation with modern Floating UI
- Access dependencies from the main Electric UI project
- Run in a secure sandboxed environment with proper context isolation

## Features

- **Dependency Explorer**: View all dependencies from both the Electric UI project and the Component Sandbox
- **Node Modules Location**: See where packages are installed on your system
- **Secure Testing Environment**: Test components in a sandboxed environment with context isolation
- **Modern Floating UI**: Uses @floating-ui/react for proper positioning, focus management, and accessibility

## Getting Started

### Prerequisites

- Node.js (same version as used in the Electric UI project)
- Yarn or npm

### Installation

1. Install dependencies:

```bash
cd component-sandbox
npm install
# or
yarn
```

2. Start the development server:

```bash
npm run dev
# or
yarn dev
```

3. In a separate terminal, start the Electron app:

```bash
npm start
# or
yarn start
```

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a distributable package in the `release` directory.

### Security Features

This sandbox implements several important security features:

- **Context Isolation**: Prevents direct access to Node.js APIs from renderer process
- **Sandboxed Content**: Electron's sandbox mode is enabled for enhanced security
- **Secure IPC**: Communication between processes is handled through a secure preload script
- **Type Safety**: TypeScript is used throughout for better type checking and security

## Scanning Dependencies

To generate a detailed report of all installed dependencies:

```bash
npm run scan-deps
# or
yarn scan-deps
```

This will create a `dependency-report.json` file with information about all installed packages.

## Project Structure

- `src/`: Source code
  - `main.ts`: Electron main process
  - `renderer.tsx`: React application for the renderer process
  - `preload.ts`: TypeScript preload script for Electron with secure IPC
  - `types/`: TypeScript type definitions
  - `components/`: UI components for testing
  - `index.html`: HTML template
- `scripts/`: Utility scripts
  - `scan-dependencies.js`: Script to scan and report on installed dependencies
- `dist/`: Compiled output (generated)
- `release/`: Production builds (generated)

## Accessing Electric UI Components

The sandbox is configured to access components from the Electric UI project. You can import them in your code like this:

```typescript
import { SomeComponent } from '@electric-ui/application/components/SomeComponent';
```

## Adding Custom Components

To add custom components for testing, create them in the `src/components/` directory.

## Floating UI Implementation

The sandbox uses @floating-ui/react for all floating components, providing:

- Proper focus management with FloatingFocusManager
- Enhanced accessibility with ARIA attributes
- Smart positioning that adapts to viewport edges
- Animation and transition support
- Proper cleanup to prevent memory leaks

Example usage:

```tsx
import { useFloating, useInteractions, useHover, FloatingFocusManager } from '@floating-ui/react';

const MyFloatingComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  });
  
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  
  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        Reference Element
      </button>
      
      {isOpen && (
        <FloatingFocusManager context={context}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
            Floating Content
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
};
```

## License

Same as the Electric UI project.
