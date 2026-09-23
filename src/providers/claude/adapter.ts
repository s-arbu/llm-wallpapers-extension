import { WallpaperProviderAdapter } from '../types';

export const claudeProvider: WallpaperProviderAdapter = {
  id: 'claude',
  matches: (url) => url.hostname === 'claude.ai',
  stylesheetPath: 'providers/claude.css'
};