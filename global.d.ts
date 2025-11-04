import type NodeCache from 'node-cache';
import {formats} from '@/i18n/request';
import en from '@/public/locales/en.json';
import routing from '@/i18n/routing';

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
  var cacheIps: NodeCache;

  interface Window {
    dataLayer: Array<Record<string, any>>; // or Array<any> for less strict typing
    webkitAudioContext: typeof AudioContext;
  }
}

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
    Locale: (typeof routing.locales)[number];
  }
}

export {};