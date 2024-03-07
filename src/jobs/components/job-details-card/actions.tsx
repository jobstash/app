import { BookmarkButton } from '~/shared/components/bookmark-button';
import { DetailsPanelActionsWrapper } from '~/shared/components/details-panel/actions-wrapper';
import { DetailsPanelCTA } from '~/shared/components/details-panel/cta';
import { ShareButton } from '~/shared/components/share-button';

export const JobDetailsCardActions = () => {
  return (
    <DetailsPanelActionsWrapper>
      <DetailsPanelCTA text={CTA_TEXT} />
      <div className="flex justify-end gap-2.5">
        <BookmarkButton />
        <ShareButton />
      </div>
    </DetailsPanelActionsWrapper>
  );
};

const CTA_TEXT = 'Apply for this job';
