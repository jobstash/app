import { FRONTEND_URL, ROUTE_SECTION } from '@jobstash/shared/core';

import { HomePageButton } from './home-page-button';

interface Props {
  text?: string;
}

export const ExploreJobsButton = ({ text }: Props) => (
  <HomePageButton
    hasBorder
    text={text ?? 'Explore Jobs'}
    url={`${FRONTEND_URL}${ROUTE_SECTION.JOBS}`}
  />
);
