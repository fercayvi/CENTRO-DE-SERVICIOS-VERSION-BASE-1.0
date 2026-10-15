/**
 * Validates navigation URLs used in user-authored portal content.
 * Only ordinary web/contact schemes and explicitly allowed data MIME types pass.
 */
export function isSafeNavigationUrl(
  value?: string | null,
  allowedDataMimeTypes: string[] = []
): boolean {
  if (typeof value !== 'string' || !value.trim()) return false;
  const url = value.trim();

  const dataMatch = url.match(/^data:([^;,]+)(?:;[^,]*)?,/i);
  if (dataMatch) {
    return allowedDataMimeTypes.some(
      (mimeType) => mimeType.toLowerCase() === dataMatch[1].toLowerCase()
    );
  }

  try {
    const parsed = new URL(url, 'https://portal.invalid');
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
