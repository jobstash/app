import {
  BankIcon,
  CardSet,
  Heading,
  MoneyIcon,
  Text,
} from '~/shared/components';
import { FundingRound, Investor, Organization } from '~/shared/core/interfaces';
import { numFormatter, prettyTimestamp } from '~/shared/utils';

import { createOrgFundingDateString } from '../utils';

interface Props {
  org: Organization;
  fundingRounds: FundingRound[];
  investors: Investor[];
}

export const RightPanelOrgCard = ({ org, fundingRounds, investors }: Props) => {
  const { name, description } = org;

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-6">
        <Heading size="md" fw="semibold">
          {name}
        </Heading>

        <div className="flex h-fit flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <div>
          <Text color="dimmed">{description}</Text>
        </div>

        <div className="flex h-fit flex-col justify-center">
          <hr className="border-t border-white/10" />
        </div>

        <div className="flex flex-col justify-center gap-3">
          {fundingRounds.map(({ id, date, raisedAmount, roundName }) => (
            <div key={id} className="flex items-center gap-x-3">
              {roundName && (
                <CardSet
                  icon={<BankIcon />}
                >{`Round Name: ${roundName}`}</CardSet>
              )}
              <CardSet icon={<MoneyIcon />}>
                {`Amount: $${numFormatter.format(raisedAmount)}M`}
              </CardSet>
              <CardSet icon={<BankIcon />}>{`Date: ${createOrgFundingDateString(
                fundingRounds[0].date,
              )}`}</CardSet>
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-3">
            {investors.map(({ name }) => (
              <CardSet key={name} icon={<MoneyIcon />}>
                {name}
              </CardSet>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
