export interface WallpaperSettings {
  imageDataUrl: string | null;
  fileName: string | null;
  opacity: number;
  blur: number;
}

const DEFAULT_SETTINGS: WallpaperSettings = {
  imageDataUrl: null,
  fileName: null,
  opacity: 0.15,
  blur: 0
};

export async function getSettings(): Promise<WallpaperSettings> {
  const result = await chrome.storage.local.get('llm_wallpaper_settings');
  const stored = result.llm_wallpaper_settings as Partial<WallpaperSettings> | undefined;

  return {
    ...DEFAULT_SETTINGS,
    ...stored
  };
}

export async function saveSettings(settings: Partial<WallpaperSettings>): Promise<void> {
  const current = await getSettings();
  const updated: WallpaperSettings = { ...current, ...settings };
  await chrome.storage.local.set({ llm_wallpaper_settings: updated });
}
