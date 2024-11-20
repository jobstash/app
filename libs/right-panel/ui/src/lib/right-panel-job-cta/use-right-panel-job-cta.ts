import { COMMUNITIES } from '@jobstash/shared/core';
import { getCommunitySubdomain } from '@jobstash/shared/utils';

import { useAuthContext } from '@jobstash/auth/state';
import {
  useJobPost,
  useJobsApplied,
  useSendJobApplyInteractionMutation,
} from '@jobstash/jobs/state';

interface Props {
  url: string;
  shortUUID: string;
  sendAnalyticsEvent: () => void;
}

export const useRightPanelJobCTA = (props: Props) => {
  const { url, shortUUID, sendAnalyticsEvent: sendAnalytics } = props;

  const { isAuthenticated, showLoginModal } = useAuthContext();
  const isAnon = !isAuthenticated;

  const { isSupported, subdomain } = getCommunitySubdomain();
  const isEthdam = isSupported && subdomain === COMMUNITIES.ETHDAM;

  const { data: jobPost, isPending: isPendingJobPost } = useJobPost(shortUUID);
  const { appliedJobs, isPendingJobsApplied, isFetchingJobsApplied } =
    useJobsApplied();
  const isLoadingJobsApplied = isPendingJobsApplied || isFetchingJobsApplied;

  const isJobastashATS = jobPost?.organization?.atsClient === 'jobstash';
  const isOneClick = isJobastashATS || isEthdam;

  const hasApplied = appliedJobs
    .map((job) => job.shortUUID)
    .includes(shortUUID);

  const { mutate: mutateJobApply, isPendingMutation } =
    useSendJobApplyInteractionMutation({
      isOneClick,
      jobPost,
      appliedJobs,
    });

  // Temp: disable donate modal
  // const [isOpenDonateModal, setIsOpenDonateModal] = useAtom(
  //   isOpenDonateModalAtom,
  // );

  const devApplyMutation = () => {
    // Temp: disable donate modal
    // if (!isOpenDonateModal) {
    //   setIsOpenDonateModal(true);
    // }

    mutateJobApply(shortUUID);
  };

  const isLoading = [
    isOneClick && isLoadingJobsApplied,
    isPendingJobPost,
    isPendingMutation,
  ].includes(true);

  const openModalIfAnon = () => {
    if (isAnon) {
      showLoginModal();
    }
  };

  return {
    isAnon,
    isOneClick,
    isDirect: !isOneClick && typeof window !== 'undefined',
    isLoading,
    devApplyMutation,
    openModalIfAnon,
    sendAnalytics,
    hasApplied,
    url,
  };
};
