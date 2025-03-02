"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Preload script for Electron
var electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('api', {
    send: function (channel, data) {
        // whitelist channels
        var validChannels = ['get-dependencies', 'get-node-modules-location'];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    receive: function (channel, func) {
        var validChannels = ['get-dependencies-result', 'get-node-modules-location-result'];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            electron_1.ipcRenderer.on(channel, function (_) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    },
    invoke: function (channel) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var validChannels = ['get-dependencies', 'get-node-modules-location'];
        if (validChannels.includes(channel)) {
            return electron_1.ipcRenderer.invoke.apply(electron_1.ipcRenderer, __spreadArray([channel], args, false));
        }
        return Promise.reject(new Error("Invalid channel: ".concat(channel)));
    }
});
