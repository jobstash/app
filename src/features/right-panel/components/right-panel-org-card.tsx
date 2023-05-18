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
}

export const RightPanelOrgCard = ({ org }: Props) => {
  const { name, description, fundingRounds } = org;

  const investors = fundingRounds.flatMap((f) => f.investors);

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

        {fundingRounds.length > 0 && (
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
                    >{`Funding Date: ${createOrgFundingDateString(
                      date,
                    )}`}</CardSet>
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
        )}

        {investors.length > 0 && (
          <>
            <div className="flex h-fit flex-col justify-center">
              <hr className="border-t border-white/10" />
            </div>

            <Heading size="sm" fw="semibold">
              Investors
            </Heading>

            <div className="flex flex-wrap items-center gap-4 pl-1">
              {investors.map(({ name }) => (
                <CardSet key={name} icon={<MoneyIcon />}>
                  {name}
                </CardSet>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
