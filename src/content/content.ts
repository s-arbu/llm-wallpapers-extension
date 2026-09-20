import { getSettings, WallpaperSettings } from '../utils/storage';
import { getProvider } from '../providers';

const provider = getProvider(new URL(window.location.href));

function loadProviderStylesheet() {
  if (!provider || document.querySelector(`link[data-llm-wallpaper-provider="${provider.id}"]`)) return;

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = chrome.runtime.getURL(provider.stylesheetPath);
  stylesheet.dataset.llmWallpaperProvider = provider.id;
  document.documentElement.appendChild(stylesheet);
}

function injectOverlay() {
  if (document.getElementById('llm-wallpaper-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'llm-wallpaper-overlay';
  document.documentElement.appendChild(overlay);
}

function applySettings(settings: WallpaperSettings) {
  const overlay = document.getElementById('llm-wallpaper-overlay');
  if (!overlay) return;

  // Apply directly to the element, avoiding :root CSS variables entirely
  if (settings.imageDataUrl && settings.imageDataUrl.startsWith('data:image')) {
    overlay.style.backgroundImage = `url("${settings.imageDataUrl}")`;
  } else {
    overlay.style.backgroundImage = 'none';
  }
  
  overlay.style.opacity = settings.opacity.toString();
  overlay.style.filter = `blur(${settings.blur}px)`;
}

async function init() {
  if (!provider) return;

  loadProviderStylesheet();
  injectOverlay();
  const settings = await getSettings();
  applySettings(settings);

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.llm_wallpaper_settings) {
      const newSettings = changes.llm_wallpaper_settings.newValue as WallpaperSettings | undefined;
      if (newSettings) applySettings(newSettings);
    }
  });
}

init();
