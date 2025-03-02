"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var electron_is_dev_1 = __importDefault(require("electron-is-dev"));
// Enable hot-reloading during development
if (electron_is_dev_1.default) {
    try {
        // Use require for electron-reload as it might not have TypeScript definitions
        var electronReload = require('electron-reload');
        var sourceDir = path.join(__dirname, '..');
        electronReload(sourceDir, {
            electron: path.join(process.cwd(), 'node_modules', '.bin', 'electron')
        });
        console.log('🔄 Hot reload enabled');
    }
    catch (err) {
        console.error('Failed to initialize electron-reload:', err);
    }
}
var mainWindow = null;
function createWindow() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Create the browser window
                    mainWindow = new electron_1.BrowserWindow({
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
                    mainWindow.once('ready-to-show', function () {
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.show();
                    });
                    if (!electron_is_dev_1.default) return [3 /*break*/, 2];
                    // In development, load from webpack dev server
                    return [4 /*yield*/, mainWindow.loadURL('http://localhost:9001')];
                case 1:
                    // In development, load from webpack dev server
                    _a.sent();
                    // Open the DevTools automatically in development mode
                    mainWindow.webContents.openDevTools();
                    console.log('Running in development mode');
                    return [3 /*break*/, 4];
                case 2: 
                // In production, load the built file
                return [4 /*yield*/, mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))];
                case 3:
                    // In production, load the built file
                    _a.sent();
                    console.log('Running in production mode');
                    _a.label = 4;
                case 4:
                    // Emitted when the window is closed
                    mainWindow.on('closed', function () {
                        mainWindow = null;
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open
        if (mainWindow === null)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
// Handle IPC messages from renderer
electron_1.ipcMain.handle('get-dependencies', function () { return __awaiter(void 0, void 0, void 0, function () {
    var electricUiPackageJson, electricUiPackage, sandboxPackageJson, sandboxPackage;
    return __generator(this, function (_a) {
        try {
            electricUiPackageJson = path.join(__dirname, '../../electric-ui-project/package.json');
            electricUiPackage = JSON.parse(fs.readFileSync(electricUiPackageJson, 'utf8'));
            sandboxPackageJson = path.join(__dirname, '../package.json');
            sandboxPackage = JSON.parse(fs.readFileSync(sandboxPackageJson, 'utf8'));
            return [2 /*return*/, {
                    electricUi: {
                        dependencies: electricUiPackage.dependencies || {},
                        devDependencies: electricUiPackage.devDependencies || {}
                    },
                    sandbox: {
                        dependencies: sandboxPackage.dependencies || {},
                        devDependencies: sandboxPackage.devDependencies || {}
                    }
                }];
        }
        catch (error) {
            console.error('Error getting dependencies:', error);
            return [2 /*return*/, { error: error.message }];
        }
        return [2 /*return*/];
    });
}); });
// Get the location of node_modules
electron_1.ipcMain.handle('get-node-modules-location', function () { return __awaiter(void 0, void 0, void 0, function () {
    var electricUiNodeModules, sandboxNodeModules;
    return __generator(this, function (_a) {
        try {
            electricUiNodeModules = path.resolve(__dirname, '../../electric-ui-project/node_modules');
            sandboxNodeModules = path.resolve(__dirname, '../node_modules');
            return [2 /*return*/, {
                    electricUi: fs.existsSync(electricUiNodeModules) ? electricUiNodeModules : null,
                    sandbox: fs.existsSync(sandboxNodeModules) ? sandboxNodeModules : null
                }];
        }
        catch (error) {
            console.error('Error getting node_modules location:', error);
            return [2 /*return*/, { error: error.message }];
        }
        return [2 /*return*/];
    });
}); });
