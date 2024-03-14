import { useRouter } from 'next/router';

import { HomePageButton } from './home-page-button';

export const ExploreJobsButton = () => {
  const router = useRouter();

  const onClick = () => router.push('/jobs');

  return <HomePageButton hasBorder text="Explore Jobs" onClick={onClick} />;
};
