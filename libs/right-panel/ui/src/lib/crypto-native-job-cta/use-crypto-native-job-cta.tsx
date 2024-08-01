import { useState } from 'react';

import { useModal, useSIWE } from 'connectkit';
import { useSetAtom } from 'jotai';
import { useAccount } from 'wagmi';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
import { notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { bypassDevSignupAtom, useAuthContext } from '@jobstash/auth/state';
import { useSendJobApplyInteractionMutation } from '@jobstash/jobs/state';

import { AnonTooltipContent } from './anon-tooltip-content';
import { EligibleTooltipContent } from './eligible-tooltip-content';
import { NotEligibleTooltipContent } from './not-eligible-tooltip-content';

const ANON_TEXT = 'Check Job Concierge Access';
const ELIGIBLE_TEXT = 'Get Job Concierge Access';
const NOT_ELIGIBLE_TEXT = 'Not eligible for Job Concierge';
const TOAST_ID = 'crypto-native-job-cta';
const LOADING_MESSAGE = 'Analyzing your profile...';
const SUCCESS_TITLE = 'You qualify for Job Concierge!';
const SUCCESS_MESSAGE = 'You can now apply to this job.';

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

  const [link, setLink] = useState('');
  const devApplyMutation = () => {
    if (isDev && isCryptoNative) {
      notifLoading({
        id: TOAST_ID,
        title: ELIGIBLE_TEXT,
        message: LOADING_MESSAGE,
      });
      mutateJobApply(jobId, {
        onError(error, variables, context) {
          console.log({ error, variables, context });
        },
        onSuccess(data) {
          notifSuccess({
            id: TOAST_ID,
            title: SUCCESS_TITLE,
            message: SUCCESS_MESSAGE,
          });
          if (data.success && data.data) {
            setLink(data.data);
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

  return {
    link,
    isCryptoNative,
    text,
    onClick,
    isLoading: isPendingMutation,
    isDisabled,
    tooltipContent,
  };
};
