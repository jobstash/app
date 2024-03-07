import { HREFS } from '~/shared/core/constants';

export const createJobPrefixedTabs = (
  id: string,
  tabs: { text: string; href: string }[],
) =>
  tabs.map((tab) => ({ ...tab, href: `${HREFS.JOBS_PAGE}/${id}${tab.href}` }));
