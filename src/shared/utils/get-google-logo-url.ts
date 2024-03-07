import { getWebsiteText } from './get-website-text';

export const getGoogleLogoUrl = (url: string) =>
  `https://www.google.com/s2/favicons?domain=${
    getWebsiteText(url).link
  }&sz=128`;
