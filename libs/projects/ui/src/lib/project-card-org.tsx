/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
import { memo } from 'react';

import { type ProjectDetails } from '@jobstash/projects/core';
import { getGoogleLogoUrl } from '@jobstash/shared/utils';

import {
  CardSet,
  CurrencyCircleDollarIcon,
  LogoTitle,
} from '@jobstash/shared/ui';

interface Props {
  projectDetails?: ProjectDetails;
}

const ProjectCardOrg = ({ projectDetails }: Props) => {
  if (!projectDetails) return null;

  const { organization, tokenSymbol } = projectDetails;

  return (
    <>
      <hr className="border-t border-white/10" />
      <div className="items-center justify-between space-y-2 lg:flex lg:space-y-0 pt-2">
        <div className="flex gap-4">
          <LogoTitle
            avatarProps={{
              src: organization.logo
                ? organization.logo
                : getGoogleLogoUrl(organization.url),
              alt: organization.name,
            }}
            title={organization.name}
            location={organization.location}
          />
          {tokenSymbol && (
            <CardSet icon={<CurrencyCircleDollarIcon />}>
              {`$${tokenSymbol}`}
            </CardSet>
          )}
          {/* TODO: Chain logos */}
        </div>
        {/* TODO: Date + Bookmark */}
      </div>
    </>
  );
};

export default memo(ProjectCardOrg);
