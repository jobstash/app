export const createJobPageTitle = (
  orgName: string | undefined,
  title: string,
) => `Jobs at ${orgName ? `${orgName} |` : ''} ${title}`;
