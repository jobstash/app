import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import {
  isPendingPickRoleAtom,
  pickRoleSectionAtom,
  useAuthContext,
} from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import {
  ConnectDevEmail,
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
    <div className="w-full lg:pl-52">
      <SideBar />

      {section === 'dev' ? (
        <ConnectDevEmail />
      ) : section === 'org' ? (
        <ConnectOrgEmail />
      ) : (
        <div className="flex flex-col lg:flex-row h-screen [&>*]:w-full pt-16 lg:pt-0 [&>*]:py-12">
          <PickRoleDevSection />
          <PickRoleOrgSection />
        </div>
      )}
    </div>
  );
};
