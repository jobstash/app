import { GrantFunding } from '@jobstash/shared/core';
import {
  createOrgFundingDateString,
  numFormatter,
} from '@jobstash/shared/utils';

import { BankIcon, CardSet, Heading, MoneyIcon } from '@jobstash/shared/ui';

interface Props {
  grants: GrantFunding[];
}

export const RightPanelGrantsFunding = ({ grants: grantFundings }: Props) => {
  const grants = (grantFundings?.filter(Boolean) as GrantFunding[]) ?? [];
  if (grants.length === 0) return null;

  return (
    <>
      <div className="flex h-fit flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <Heading size="sm" fw="semibold">
        Grants
      </Heading>

      <div className="flex flex-col justify-center gap-4 pl-1">
        {grants.map(
          (
            { id, tokenUnit, tokenAmount, fundingDate, amount, programName },
            i,
          ) => (
            <div key={id} className="flex flex-col gap-2.5">
              <p>TODO</p>
              <div className="flex flex-wrap items-center gap-x-4">
                {programName && (
                  <CardSet
                    icon={<BankIcon />}
                  >{`Funding Round: ${programName}`}</CardSet>
                )}

                {fundingDate && (
                  <CardSet icon={<BankIcon />}>
                    {createOrgFundingDateString(fundingDate)}
                  </CardSet>
                )}

                {amount && (
                  <CardSet icon={<MoneyIcon />}>
                    {`Amount: $${numFormatter.format(amount)}`}
                  </CardSet>
                )}

                {tokenUnit && tokenAmount && (
                  <CardSet icon={<MoneyIcon />}>
                    {`Token: ${numFormatter.format(tokenAmount)} ${tokenUnit}`}
                  </CardSet>
                )}
              </div>

              {i !== grants.length - 1 && (
                <div className="flex h-fit flex-col justify-center">
                  <hr className="border-t border-dashed border-white/20" />
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </>
  );
};
