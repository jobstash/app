export const getWebsiteText = (website: string) => {
  if (!website) return { link: '', hostname: '' };

  const isUrl = website.startsWith('http');
  const url = new URL(isUrl ? website : `https://${website}`);

  return {
    link: url.toString(),
    hostname: url.hostname,
  };
};
