import { DetailsPanelActionsWrapper } from '~/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCTA } from '~/shared/components/details-panel/cta';
import { Divider } from '~/shared/components/divider';

export const JobOrgCardActions = () => {
  return (
    <>
      <Divider />
      <DetailsPanelActionsWrapper>
        <DetailsPanelCTA text={CTA_TEXT} />
      </DetailsPanelActionsWrapper>
    </>
  );
};

const CTA_TEXT = 'Explore Organization';
