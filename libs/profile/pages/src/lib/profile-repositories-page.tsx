import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileRepoPageProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  ProfileHeader,
  ProfileRepoGotItCard,
  ProfileRepoSubHeader,
} from '@jobstash/profile/ui';
import {
  ProfileRepoList,
  ProfileRepoRightPanel,
} from '@jobstash/profile/feature';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  isOnboardSSR: boolean;
}

export const ProfileRepositoriesPage = ({ isOnboardSSR }: Props) => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (canRender)
    return (
      <ProfileRepoPageProvider isOnboardSSR={isOnboardSSR}>
        <Head>
          <title>Your Repositories</title>
        </Head>

        <div className="w-full lg:pl-52">
          <SideBar />

          <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
            <ProfileHeader />
            <ProfileRepoSubHeader />
            <ProfileRepoGotItCard />
            <ProfileRepoList />
          </div>

          <ProfileRepoRightPanel />
        </div>
      </ProfileRepoPageProvider>
    );

  return <LoadingPage />;
};
