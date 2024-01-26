import { memo } from 'react';

import { FRONTEND_URL, type Investor } from '@jobstash/shared/core';

import { CardSet, Heading, MoneyIcon } from '@jobstash/shared/ui';

interface Props {
  investors: Investor[];
}

const RightPanelOrgCardInvestors = ({ investors }: Props) => {
  if (investors.length === 0) return null;

  return (
    <>
      <div className="flex h-fit flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <Heading size="sm" fw="semibold">
        Investors
      </Heading>

      <div className="flex flex-wrap items-center gap-4 pl-1">
        {investors.map(({ id, name }) => (
          <CardSet
            key={id}
            icon={<MoneyIcon />}
            link={`${FRONTEND_URL}/organizations?investor=${name}`}
            showLinkIcon={false}
            isExternal={false}
          >
            {name}
          </CardSet>
        ))}
      </div>
    </>
  );
};

export default memo(RightPanelOrgCardInvestors);
