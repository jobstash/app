import { memo } from 'react';

import { type FundingRound } from '@jobstash/shared/core';
import {
  createOrgFundingDateString,
  numFormatter,
} from '@jobstash/shared/utils';

import { BankIcon, CardSet, Heading, MoneyIcon } from '@jobstash/shared/ui';

interface Props {
  fundingRounds: FundingRound[];
}

const RightPanelOrgCardFundingRounds = ({ fundingRounds }: Props) => {
  if (fundingRounds.length === 0) return null;

  return (
    <>
      <div className="flex h-fit flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <Heading size="sm" fw="semibold">
        Funding Rounds
      </Heading>

      <div className="flex flex-col justify-center gap-4 pl-1">
        {fundingRounds.map(({ id, date, raisedAmount, roundName }, i) => (
          <div key={id} className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-x-4">
              {roundName && (
                <CardSet
                  icon={<BankIcon />}
                >{`Funding Round: ${roundName}`}</CardSet>
              )}
              <CardSet
                icon={<BankIcon />}
              >{`Funding Date: ${createOrgFundingDateString(date)}`}</CardSet>
              {raisedAmount && (
                <CardSet icon={<MoneyIcon />}>
                  {`Last Amount: $${numFormatter.format(raisedAmount)}M`}
                </CardSet>
              )}
            </div>
            {i !== fundingRounds.length - 1 && (
              <div className="flex h-fit flex-col justify-center">
                <hr className="border-t border-dashed border-white/20" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelOrgCardFundingRounds);
