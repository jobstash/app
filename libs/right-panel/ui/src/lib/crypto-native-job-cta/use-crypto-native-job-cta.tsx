import { useState } from 'react';

import { useSetAtom } from 'jotai';

import { CHECK_WALLET_ROLES, CheckWalletRole } from '@jobstash/auth/core';
import { notifLoading, notifSuccess } from '@jobstash/shared/utils';

import { bypassDevSignupAtom, useAuthContext } from '@jobstash/auth/state';
import { useSendJobApplyInteractionMutation } from '@jobstash/jobs/state';

import { AnonTooltipContent } from './anon-tooltip-content';
import { EligibleTooltipContent } from './eligible-tooltip-content';
import { NotEligibleTooltipContent } from './not-eligible-tooltip-content';

const ANON_TEXT = 'Check Fast Track Access';
const ELIGIBLE_TEXT = 'Get Elite Fast Track Access';
const NOT_ELIGIBLE_TEXT = 'Not eligible for Elite Fast Track';
const TOAST_ID = 'crypto-native-job-cta';
const LOADING_MESSAGE = 'We are curating your profile. Please wait!';
const SUCCESS_TITLE = 'You have been curated!';
const SUCCESS_MESSAGE = 'You can now apply to this job.';

interface Props {
  jobId: string;
  sendAnalyticsEvent: (role: CheckWalletRole) => void;
}

export const useCryptoNativeJobCTA = (props: Props) => {
  const { sendAnalyticsEvent, jobId } = props;

  const {
    role,
    isCryptoNative,
    isLoading: isLoadingAuth,
    isAuthenticated,
    showLoginModal,
  } = useAuthContext();
  const isAnon = !isAuthenticated;
  const isDev = role === CHECK_WALLET_ROLES.DEV;
  const isEligible = isCryptoNative && isDev;

  const text = isAnon
    ? ANON_TEXT
    : isEligible
    ? ELIGIBLE_TEXT
    : NOT_ELIGIBLE_TEXT;

  const setBypassDevSignup = useSetAtom(bypassDevSignupAtom);
  const openModalIfAnon = () => {
    if (isAnon) {
      showLoginModal();
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
