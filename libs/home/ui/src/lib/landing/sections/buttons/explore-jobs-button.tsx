import { useRouter } from 'next/router';

import { HomePageButton } from './home-page-button';

interface Props {
  text?: string;
}

export const ExploreJobsButton = ({ text }: Props) => {
  const router = useRouter();

  const onClick = () => router.push('/jobs');

  return (
    <HomePageButton hasBorder text={text ?? 'Explore Jobs'} onClick={onClick} />
  );
};
