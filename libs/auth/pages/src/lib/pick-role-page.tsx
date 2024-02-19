import { LoadingPage } from '@jobstash/shared/pages';
import { useAtomValue } from 'jotai';

import { CHECK_WALLET_FLOWS } from '@jobstash/auth/core';

import {
  isLoadingDevCallbackAtom,
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
  const section = useAtomValue(pickRoleSectionAtom);

  const shouldRenderPickRole = useFlowCheck();

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

const useFlowCheck = () => {
  const isMounted = useIsMounted();
  const isLoadingDevCallback = useAtomValue(isLoadingDevCallbackAtom);
  const { flow } = useAuthContext();

  return (
    isMounted && !isLoadingDevCallback && flow === CHECK_WALLET_FLOWS.PICK_ROLE
  );
};
