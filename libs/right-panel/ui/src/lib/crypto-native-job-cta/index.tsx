/* eslint-disable react/no-unused-prop-types */
import { Button } from '@heroui/button';

import { openNewTab } from '@jobstash/shared/utils';

import RightPanelCta from '../right-panel-cta';
import { CTATooltip } from '../right-panel-job-cta/cta-tooltip';

import { useCryptoNativeJobCTA } from './use-crypto-native-job-cta';

interface Props {
  jobId: string;
  sendAnalyticsEvent: () => void;
}

export const CryptoNativeJobCTA = (props: Props) => {
  const { link, text, onClick, isLoading, isDisabled, tooltipContent } =
    useCryptoNativeJobCTA(props);

  // Temp: disable donate modal
  // const [isOpenDonateModal, setIsOpenDonateModal] = useAtom(
  //   isOpenDonateModalAtom,
  // );

  const onClickLink = () => {
    // Temp: disable donate modal
    // if (!isOpenDonateModal) {
    //   setIsOpenDonateModal(true);
    // }

    openNewTab(link);
  };

  if (link) {
    return (
      <Button
        className="bg-gradient-to-l from-primary to-tertiary"
        radius="sm"
        onClick={onClickLink}
      >
        Apply as Expert
      </Button>
    );
  }

  return (
    <CTATooltip content={tooltipContent}>
      <RightPanelCta
        isLoading={isLoading}
        isDisabled={isDisabled}
        text={text}
        onClick={onClick}
      />
    </CTATooltip>
  );
};
