export interface WallpaperProviderAdapter {
  id: string;
  matches(url: URL): boolean;
  stylesheetPath: string;
}
