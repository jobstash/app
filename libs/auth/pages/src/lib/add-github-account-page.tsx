import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { LoadingPage } from '@jobstash/shared/pages';
import { Avatar as CkAvatar } from 'connectkit';
import { useAccount } from 'wagmi';

import {
  CHECK_WALLET_FLOWS,
  CHECK_WALLET_ROUTE,
  redirectFlowsSet,
} from '@jobstash/auth/core';

import { useAuthContext, useUpdateFlow } from '@jobstash/auth/state';
import { useIsMounted } from '@jobstash/shared/state';

import { Button, Loader, Text, ThrashIcon } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  fromSSR?: boolean;
}

export const AddGithubAccountPage = ({ fromSSR }: Props) => {
  const { address, isConnected } = useAccount();
  const isMounted = useIsMounted();

  const { isLoading, mutate } = useUpdateFlow('/your-repositories');

  const { flow } = useAuthContext();
  const isAddGithubRepoFlow = flow === CHECK_WALLET_FLOWS.ADD_GITHUB_REPO;

  const { replace } = useRouter();

  useEffect(() => {
    if (!isAddGithubRepoFlow && !fromSSR) {
      const redirectRoute = redirectFlowsSet.has(flow)
        ? CHECK_WALLET_ROUTE[flow]
        : '/';

      replace(redirectRoute);
    }
  }, [flow, fromSSR, isAddGithubRepoFlow, replace]);

  const onClickRepoList = useCallback(() => {
    mutate(CHECK_WALLET_FLOWS.ONBOARD_REPO);
  }, [mutate]);

  if (isConnected && isMounted && isAddGithubRepoFlow)
    return (
      <>
        <Head>
          <title>Add Github Account</title>
        </Head>
        <div className="w-full pl-52">
          <SideBar />

          <div className="flex h-screen items-center justify-center pl-4">
            <div className="flex flex-col items-center space-y-6">
              <Loader isSpinning={false} />
              <div className="flex flex-col space-y-6 rounded-3xl bg-gradient-to-r from-[#141317] to-black/60 p-8">
                <hr className="border-t border-white/10" />

                <Text size="lg" fw="bold">
                  Add Github Account(s)
                </Text>

                <div className="w-72">
                  <Text color="dimmed">
                    To create a Developer account you need to connect with one
                    or more of your Github account(s).
                  </Text>
                </div>

                {address && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <CkAvatar address={address} name={address} size={24} />
                      <Text size="lg">
                        {`${address.slice(0, 6)} ... ${address.slice(-6)}`}
                      </Text>
                    </div>

                    <div className="cursor-pointer">
                      <ThrashIcon />
                    </div>
                  </div>
                )}

                <div>
                  <Button size="sm" variant="outline">
                    Add another account
                  </Button>
                </div>

                <hr className="border-t border-white/10" />

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    textProps={{ fw: 'normal', size: 'sm' }}
                    isDisabled={isLoading}
                    onClick={onClickRepoList}
                  >
                    Go To My Repository List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return <LoadingPage />;
};
