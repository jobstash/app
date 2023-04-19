import { memo, useMemo } from 'react';

import { CardSet, LogoTitle, Text } from '~/shared/components';
import type { FundingRound, Organization } from '~/shared/core/interfaces';

import { createRightPanelOrgTags } from '../../utils';

interface Props {
  organization: Organization;
  fundingRounds: FundingRound[];
}

const JobRightPanelHeader = ({ organization, fundingRounds }: Props) => {
  const fundingDateTs = useMemo(() => {
    const fundingDates = fundingRounds
      .filter((f) => Boolean(f.date))
      .map((f) => f.date);
    if (fundingDates.length === 0) return -1;

    return fundingDates[0];
  }, [fundingRounds]);

  const { orgTags, orgSocials } = useMemo(
    () => createRightPanelOrgTags(organization, fundingDateTs),
    [fundingDateTs, organization],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex h-10 items-center">
          <LogoTitle
            title={organization.name}
            avatarProps={{
              src: `https://www.google.com/s2/favicons?domain=${organization.url}&sz=128`,
              alt: organization.name,
            }}
          />
        </div>
        <div className="flex gap-4">
          {orgTags.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      </div>

      <Text color="dimmed">{organization.summary as string}</Text>

      {orgSocials.length > 0 && (
        <div className="flex gap-4">
          {orgSocials.map(({ text, icon, link }) => (
            <CardSet key={text} link={link} icon={icon}>
              {text}
            </CardSet>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(
  JobRightPanelHeader,
  // Might be different org instance from different job post, but if their ID is the same, their contents would be the same too
  (prev, next) => prev.organization.id === next.organization.id,
);
