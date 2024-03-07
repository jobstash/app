import { FundingRound } from '~/shared/core/schemas';
import { InfoTagProps } from '~/shared/core/types';
import { formatNumber } from '~/shared/utils/format-number';
import { shortTimestamp } from '~/shared/utils/short-timestamp';
import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { BankIcon } from '~/shared/components/icons/bank-icon';
import { PaperBillIcon } from '~/shared/components/icons/paper-bill-icon';
import { InfoTags } from '~/shared/components/info-tags';

interface Props {
  fundingRounds: FundingRound[];
}

export const JobOrgCardFundingRounds = ({ fundingRounds }: Props) => {
  const count = fundingRounds.length;

  if (!count) return null;

  return (
    <>
      <Divider />

      <Heading text={HEADING_TEXT} className="text-lg font-semibold" />

      <div className="flex flex-col justify-center gap-2">
        {fundingRounds.map((fundingRound, i) => (
          <>
            <div key={fundingRound.id} className="flex flex-wrap lg:h-6">
              <InfoTags
                tags={createFundingRoundTags(fundingRound)}
                compact
                classNames={{ wrapper: 'gap-y-0' }}
              />
            </div>
            {i !== count - 1 && <DashedLine />}
          </>
        ))}
      </div>
    </>
  );
};

const HEADING_TEXT = 'Funding Rounds';

const createFundingRoundTags = (fundingRound: FundingRound) => {
  const { roundName, date, raisedAmount } = fundingRound;

  const tags: InfoTagProps[] = [];

  if (roundName) {
    tags.push({
      text: `Funding Round: ${roundName}`,
      icon: <PaperBillIcon />,
    });
  }

  tags.push({
    text: `Funding Date: ${shortTimestamp(date)}`,
    icon: <BankIcon />,
  });

  if (raisedAmount) {
    tags.push({
      text: `Raised Amount: $${formatNumber(raisedAmount)}M`,
      icon: <PaperBillIcon />,
    });
  }

  return tags;
};

const DashedLine = () => (
  <div className="h-1 pt-0.5">
    <hr className="border-t border-dashed border-white/20" />
  </div>
);
