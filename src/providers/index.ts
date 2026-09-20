import { WallpaperProviderAdapter } from './types';
import { chatgptProvider } from './chatgpt/adapter';
import { geminiProvider } from './gemini/adapter';

const providers: WallpaperProviderAdapter[] = [chatgptProvider, geminiProvider];

export function getProvider(url: URL): WallpaperProviderAdapter | undefined {
  return providers.find((provider) => provider.matches(url));
}
