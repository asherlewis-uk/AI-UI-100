const DEV_DOMAIN = process.env.EXPO_PUBLIC_DOMAIN ?? "";

export function getApiUrl(): string {
  if (DEV_DOMAIN) {
    return `https://${DEV_DOMAIN}/`;
  }
  return "/";
}
