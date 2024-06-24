import { useModal, useSIWE } from 'connectkit';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
import { openNewTab } from '@jobstash/shared/utils';

import { bypassDevSignupAtom, useAuthContext } from '@jobstash/auth/state';
import { useSendJobApplyInteractionMutation } from '@jobstash/jobs/state';

import { AnonTooltipContent } from './anon-tooltip-content';
import { EligibleTooltipContent } from './eligible-tooltip-content';
import { NotEligibleTooltipContent } from './not-eligible-tooltip-content';

const ANON_TEXT = 'Check Fast Track Access';
const ELIGIBLE_TEXT = 'Elite Fast Track Apply';
const NOT_ELIGIBLE_TEXT = 'Not eligible for Elite Fast Track';

interface Props {
  jobId: string;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const useCryptoNativeJobCTA = (props: Props) => {
  const { sendAnalyticsEvent, jobId } = props;
  const { isConnected } = useAccount();
  const { isSignedIn } = useSIWE();
  const isAnon = !isConnected || !isSignedIn;

  const { role, isCryptoNative, isLoading: isLoadingAuth } = useAuthContext();
  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isEligible = isCryptoNative && isDev;

  const text = isAnon
    ? ANON_TEXT
    : isEligible
    ? ELIGIBLE_TEXT
    : NOT_ELIGIBLE_TEXT;

  const { setOpen } = useModal();
  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);
  const openModalIfAnon = () => {
    if (isAnon) {
      setOpen(true);
      setBypassDevSignup(true);
    }
  };

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation();

  const isDisabled =
    isLoadingAuth || isPendingMutation || (!isCryptoNative && !isAnon);

  const devApplyMutation = () => {
    if (isDev && isCryptoNative) {
      mutateJobApply(jobId, {
        onError(error, variables, context) {
          console.log({ error, variables, context });
        },
        onSuccess(data) {
          if (data.success) {
            openNewTab(data.data);
          }
        },
      });
    }
  };

  const onClick = () => {
    sendAnalyticsEvent(role);
    isAnon ? openModalIfAnon() : devApplyMutation();
  };

  const tooltipContent = isAnon ? (
    <AnonTooltipContent />
  ) : isEligible ? (
    <EligibleTooltipContent />
  ) : (
    <NotEligibleTooltipContent />
  );

  return { isCryptoNative, text, onClick, isDisabled, tooltipContent };
};
