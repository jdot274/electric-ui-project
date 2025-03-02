/**
 * Type definition for the Electron API exposed by the preload script
 * This enables proper TypeScript integration for IPC communication
 */

interface ElectronAPI {
  /**
   * Send a message to the main process via IPC
   * @param channel The channel to send the message on
   * @param data The data to send
   */
  send: (channel: string, data: any) => void;
  
  /**
   * Register a callback to receive messages from the main process
   * @param channel The channel to listen on
   * @param func The callback function
   */
  receive: (channel: string, func: (...args: any[]) => void) => void;
  
  /**
   * Invoke a function in the main process and wait for a response
   * @param channel The channel to send the invocation on
   * @param args The arguments to pass to the invocation
   * @returns A promise that resolves with the result
   */
  invoke: <T = any>(channel: string, ...args: any[]) => Promise<T>;
}

declare global {
  interface Window {
    api: ElectronAPI;
  }
}

export {};
