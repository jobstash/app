import Link from 'next/link';

import { HREFS } from '~/shared/core/constants';
import { getLogoUrl } from '~/shared/utils/get-logo-url';
import { CardWrapper } from '~/shared/components/card-wrapper';
import { Divider } from '~/shared/components/divider';
import { InfoTags } from '~/shared/components/info-tags';
import { LogoTitle } from '~/shared/components/logo-title';

import { ORG_TEST_IDS } from '~/orgs/core/constants';
import { OrgListItem } from '~/orgs/core/schemas';
import { activeOrgIdAtom } from '~/orgs/atoms/active-org-id-atom';

import { createOrgCardTags } from './create-org-card-tags';

interface Props {
  orgItem: OrgListItem;
  isInit?: boolean;
  filterParamsString?: string;
}

export const OrgCard = ({
  orgItem,
  isInit,
  filterParamsString = '',
}: Props) => {
  const { orgId, url, logoUrl, name, location } = orgItem;

  const src = getLogoUrl(url, logoUrl);
  const tags = createOrgCardTags(orgItem);

  return (
    <CardWrapper id={orgId} idAtom={activeOrgIdAtom}>
      <Link
        href={`${HREFS.ORGS_PAGE}/${orgId}/details${filterParamsString}`}
        scroll={false}
        data-testid={ORG_TEST_IDS.ORG_CARD}
        data-uuid={orgId}
        data-is-init={isInit ?? undefined}
        prefetch={true}
        className="flex flex-col gap-3 p-6"
      >
        <div className="flex items-center justify-between">
          <LogoTitle src={src}>
            <div className="flex flex-col ">
              <h3 className={`font-lato text-lg font-bold`}>{name}</h3>
              <h4 className={`font-lato text-sm text-white/60`}>{location}</h4>
            </div>
          </LogoTitle>
          <p>TODO</p>
        </div>

        {tags.length > 0 && <Divider />}

        <InfoTags compact tags={tags} />
      </Link>
    </CardWrapper>
  );
};
