import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import isDev from 'electron-is-dev';

// Enable hot-reloading during development
if (isDev) {
  try {
    // Use require for electron-reload as it might not have TypeScript definitions
    const electronReload = require('electron-reload');
    
    const sourceDir = path.join(__dirname, '..');
    electronReload(sourceDir, {
      electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron')
    });
    console.log('🔄 Hot reload enabled');
  } catch (err) {
    console.error('Failed to initialize electron-reload:', err);
  }
}

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Will be compiled from preload.ts
      sandbox: true
    },
    // Set transparent background to show glassmorphic effects
    backgroundColor: '#00ffffff',
    show: false // Don't show until ready-to-show
  });

  // Show window when ready to prevent flickering
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  // Load the index.html of the app
  if (isDev) {
    // In development, load from webpack dev server
    await mainWindow.loadURL('http://localhost:9001');
    
    // Open the DevTools automatically in development mode
    mainWindow.webContents.openDevTools();
    
    console.log('Running in development mode');
  } else {
    // In production, load the built file
    await mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    console.log('Running in production mode');
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open
    if (mainWindow === null) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Handle IPC messages from renderer
ipcMain.handle('get-dependencies', async () => {
  try {
    // Get dependencies from electric-ui-project
    const electricUiPackageJson = path.join(__dirname, '../../electric-ui-project/package.json');
    const electricUiPackage = JSON.parse(fs.readFileSync(electricUiPackageJson, 'utf8'));
    
    // Get dependencies from component-sandbox
    const sandboxPackageJson = path.join(__dirname, '../package.json');
    const sandboxPackage = JSON.parse(fs.readFileSync(sandboxPackageJson, 'utf8'));
    
    return {
      electricUi: {
        dependencies: electricUiPackage.dependencies || {},
        devDependencies: electricUiPackage.devDependencies || {}
      },
      sandbox: {
        dependencies: sandboxPackage.dependencies || {},
        devDependencies: sandboxPackage.devDependencies || {}
      }
    };
  } catch (error) {
    console.error('Error getting dependencies:', error);
    return { error: (error as Error).message };
  }
});

// Get the location of node_modules
ipcMain.handle('get-node-modules-location', async () => {
  try {
    const electricUiNodeModules = path.resolve(__dirname, '../../electric-ui-project/node_modules');
    const sandboxNodeModules = path.resolve(__dirname, '../node_modules');
    
    return {
      electricUi: fs.existsSync(electricUiNodeModules) ? electricUiNodeModules : null,
      sandbox: fs.existsSync(sandboxNodeModules) ? sandboxNodeModules : null
    };
  } catch (error) {
    console.error('Error getting node_modules location:', error);
    return { error: (error as Error).message };
  }
});
