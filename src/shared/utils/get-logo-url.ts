import { getGoogleLogoUrl } from './get-google-logo-url';

export const getLogoUrl = (url: string, logo?: string | null) =>
  getGoogleLogoUrl(logo ?? url);
