import { DetailsPanelCardWrapper } from '~/shared/components/details-panel/card-wrapper';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

interface Props {
  reviewButton: React.ReactNode;
  shareButton: React.ReactNode;
}

export const LeaveReview = ({ reviewButton, shareButton }: Props) => {
  return (
    <DetailsPanelCardWrapper>
      <Heading text={HEADING_TEXT} />

      {BODY_TEXTS.map((text, i) => (
        <Text key={i} text={text} />
      ))}

      <div className="flex gap-4">
        {reviewButton}
        {shareButton}
      </div>
    </DetailsPanelCardWrapper>
  );
};

const HEADING_TEXT = 'Leave a Review';

const BODY_TEXTS = [
  'Only devs associated with the org can review it.',
  'If you know anyone who works or worked here here, please invite them to review this organization. It&#39;s easy: Share the link above with them!',
];
