import { getGoogleLogoUrl } from './get-google-logo-url';
import { getWebsiteText } from './get-website-text';

export const getLogoUrl = (url: string | null, logo?: string | null) =>
  logo && logo.trim().length > 0
    ? `/api/image?logo=${getWebsiteText(logo).link}&url=${
        getWebsiteText(url).link
      }`
    : getGoogleLogoUrl(url);
