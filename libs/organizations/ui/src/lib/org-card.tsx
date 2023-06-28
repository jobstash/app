import { memo, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type OrgListItem } from '@jobstash/organizations/core';
import { EVENT_CARD_CLICK, FRONTEND_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createOrgKey } from '@jobstash/organizations/utils';

import { activeOrgIdAtom } from '@jobstash/organizations/state';
import { mobileRightPanelOpenAtom, useIsMobile } from '@jobstash/shared/state';

import OrgCardHeader from './org-card-header';
import OrgCardTags from './org-card-tags';
import OrgCardTechs from './org-card-techs';
import OrgCardWrapper from './org-card-wrapper';

interface Props {
  orgListItem: OrgListItem;
  isActive: boolean;
  filterParamsObj: Record<string, string>;
}

const OrgCard = ({ orgListItem, isActive, filterParamsObj }: Props) => {
  const { orgId, technologies, name } = orgListItem;

  const setActiveOrgId = useSetAtom(activeOrgIdAtom);

  const isMobile = useIsMobile();
  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);

  const href = useMemo(
    () =>
      getUrlWithParams(
        FRONTEND_URL,
        `/organizations/${createOrgKey({ orgId, name })}/details`,
        filterParamsObj,
      ).toString(),
    [filterParamsObj, name, orgId],
  );

  const onClick = () => {
    setActiveOrgId(orgId);

    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    // If on mobile, set mobileRightPanelOpen (used for disabling scroll in main window)
    if (isMobile) {
      setMobileRightPanelOpen(true);
    }
  };

  return (
    <OrgCardWrapper href={href} isActive={isActive} onClick={onClick}>
      <OrgCardHeader orgListItem={orgListItem} />
      <OrgCardTags orgListItem={orgListItem} />
      <OrgCardTechs techs={technologies} />
    </OrgCardWrapper>
  );
};

export default memo(OrgCard);
