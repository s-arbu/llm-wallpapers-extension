export interface ImageCompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: ImageCompressionOptions = {
  maxWidth: 3840, // Capped at 4K resolution
  maxHeight: 2160,
  quality: 0.92   // High-fidelity quality output
};

export async function compressImageToDataUrl(
  file: File,
  options: ImageCompressionOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  const maxW = opts.maxWidth!;
  const maxH = opts.maxHeight!;

  // Downscale only if image exceeds 4K dimensions
  if (width > maxW || height > maxH) {
    const aspectRatio = width / height;
    if (width / maxW > height / maxH) {
      width = maxW;
      height = Math.round(maxW / aspectRatio);
    } else {
      height = maxH;
      width = Math.round(maxH * aspectRatio);
    }
  }

  let blob: Blob | null = null;

  if (typeof OffscreenCanvas !== 'undefined') {
    const offscreen = new OffscreenCanvas(width, height);
    const ctx = offscreen.getContext('2d');
    if (!ctx) throw new Error('Could not obtain OffscreenCanvas 2D context');

    ctx.drawImage(bitmap, 0, 0, width, height);
    blob = await offscreen.convertToBlob({
      type: 'image/webp',
      quality: opts.quality
    });
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not obtain Canvas 2D context');

    ctx.drawImage(bitmap, 0, 0, width, height);
    blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/webp', opts.quality);
    });
  }

  bitmap.close();

  if (!blob) throw new Error('Failed to encode image to WebP format');

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
