import Head from 'next/head';

import { LoadingPage } from '@jobstash/shared/pages';

import { ProfileInfoProvider } from '@jobstash/profile/state';
import { useDelayedAuthRender } from '@jobstash/shared/state';

import {
  ProfileDevInfo,
  ProfileGotItCard,
  ProfileHeader,
  ProfileSubHeader,
} from '@jobstash/profile/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  isOnboardSSR: boolean;
}

export const ProfilePage = ({ isOnboardSSR }: Props) => {
  const { canRender } = useDelayedAuthRender({ requireConnected: true });

  if (canRender) {
    return (
      <>
        <Head>Profile</Head>

        <div className="w-full lg:pl-52">
          <SideBar />

          <div className="px-3.5 pt-[65px] lg:px-12 lg:pt-6 lg:pr-[50%] flex flex-col gap-6">
            <ProfileInfoProvider>
              <ProfileHeader />
            </ProfileInfoProvider>

            <ProfileSubHeader />

            <ProfileGotItCard initShow={isOnboardSSR} />

            <ProfileDevInfo />
          </div>
        </div>
      </>
    );
  }

  return <LoadingPage />;
};
