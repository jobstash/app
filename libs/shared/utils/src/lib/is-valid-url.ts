export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // Validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // Validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // Validate fragment locator
  return Boolean(urlPattern.test(urlString));
};
