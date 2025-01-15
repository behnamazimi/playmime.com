import type NodeCache from 'node-cache';

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;

  interface Window {
    dataLayer: Array<Record<string, any>>; // or Array<any> for less strict typing
    webkitAudioContext: typeof AudioContext;
  }
}

export {};