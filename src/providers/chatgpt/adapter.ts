import { WallpaperProviderAdapter } from '../types';

export const chatgptProvider: WallpaperProviderAdapter = {
  id: 'chatgpt',
  matches: (url) => url.hostname === 'chatgpt.com' || url.hostname.endsWith('.chatgpt.com'),
  stylesheetPath: 'providers/chatgpt.css'
};