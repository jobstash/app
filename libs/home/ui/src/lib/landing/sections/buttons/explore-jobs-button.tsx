import { FRONTEND_URL, ROUTE_SECTION } from '@jobstash/shared/core';
import { openNewTab } from '@jobstash/shared/utils';

import { HomePageButton } from './home-page-button';

interface Props {
  text?: string;
}

export const ExploreJobsButton = ({ text }: Props) => (
  <HomePageButton
    hasBorder
    text={text ?? 'Explore Jobs'}
    onClick={openJobsPage}
  />
);

const openJobsPage = () => openNewTab(`${FRONTEND_URL}${ROUTE_SECTION.JOBS}`);
