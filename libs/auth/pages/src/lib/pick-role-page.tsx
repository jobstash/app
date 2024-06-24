import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';
import { lato } from '@jobstash/shared/core';

import {
  bypassDevSignupAtom,
  isPendingPickRoleAtom,
  pickRoleSectionAtom,
  useAuthContext,
} from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import {
  BypassCandidateSection,
  ConnectDevEmail,
  ConnectEmailDone,
  ConnectOrgEmail,
  PickRoleDevSection,
  PickRoleOrgSection,
} from '@jobstash/auth/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const PickRolePage = () => {
  const router = useRouter();
  const section = useAtomValue(pickRoleSectionAtom);

  const isMounted = useIsMounted();

  const { flow, isLoading, refetch, isFetching } = useAuthContext();
  const isPickRoleFlow = flow === CHECK_WALLET_FLOWS.PICK_ROLE;
  const isLoadingAuth = isLoading || isFetching;

  const shouldRenderPickRole = isMounted && !isLoadingAuth && isPickRoleFlow;
  const isPendingPickRole = useAtomValue(isPendingPickRoleAtom);
  const isBypassDev = useAtomValue(bypassDevSignupAtom);

  // Refetch once
  const refetchRef = useRef(false);
  useEffect(() => {
    if (!refetchRef.current) {
      refetchRef.current = true;
      refetch();
    }
  }, [refetch]);

  if (!isPickRoleFlow && !isPendingPickRole) {
    router.push('/');
  }

  if (!shouldRenderPickRole && !section) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full lg:pl-52 lg:pt-[100px] min-h-screen">
      <SideBar />

      {section === 'email-done' ? (
        <ConnectEmailDone />
      ) : section === 'dev' ? (
        <ConnectDevEmail />
      ) : section === 'org' ? (
        <ConnectOrgEmail />
      ) : isBypassDev ? (
        <BypassCandidateSection />
      ) : (
        <div className="pt-[80px] xl:pr-52">
          <div className="text-center px-4 pb-10 lg:pb-20">
            <h2
              className={`${lato.className} font-semibold leading-none text-white text-[40px] lg:text-[110px]`}
            >
              Choose your <span className="text-secondary">side</span>
            </h2>
          </div>
          <div className="px-4 space-y-6 lg:flex lg:justify-center lg:gap-x-5 xl:gap-x-20 lg:items-start lg:space-y-0 lg:px-0">
            <PickRoleDevSection />
            <PickRoleOrgSection />
          </div>
        </div>
      )}
    </div>
  );
};
