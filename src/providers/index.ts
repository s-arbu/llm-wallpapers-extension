import { WallpaperProviderAdapter } from './types';
import { geminiProvider } from './gemini/adapter';

const providers: WallpaperProviderAdapter[] = [geminiProvider];

export function getProvider(url: URL): WallpaperProviderAdapter | undefined {
  return providers.find((provider) => provider.matches(url));
}
