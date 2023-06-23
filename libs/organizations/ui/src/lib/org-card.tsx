import { memo, useCallback, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type OrgPost } from '@jobstash/organizations/core';
import { EVENT_CARD_CLICK, FRONTEND_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createOrgKey } from '@jobstash/organizations/utils';

import { activeOrgAtom } from '@jobstash/organizations/state';
import { mobileRightPanelOpenAtom, useIsMobile } from '@jobstash/shared/state';

import OrgCardHeader from './org-card-header';
import OrgCardTags from './org-card-tags';
import OrgCardTechs from './org-card-techs';
import OrgCardWrapper from './org-card-wrapper';

interface Props {
  orgPost: OrgPost;
  isActive: boolean;
  filterParamsObj: Record<string, string>;
}

const OrgCard = ({ orgPost, isActive, filterParamsObj }: Props) => {
  const setActiveOrg = useSetAtom(activeOrgAtom);

  const isMobile = useIsMobile();
  const setMobileRightPanelOpen = useSetAtom(mobileRightPanelOpenAtom);

  const onClick = useCallback(() => {
    setActiveOrg(orgPost);
    document.dispatchEvent(new Event(EVENT_CARD_CLICK));

    // If on mobile, set mobileRightPanelOpen (used for disabling scroll in main window)
    if (isMobile) {
      setMobileRightPanelOpen(true);
    }
  }, [isMobile, orgPost, setActiveOrg, setMobileRightPanelOpen]);

  const href = useMemo(() => {
    const url = getUrlWithParams(
      FRONTEND_URL,
      `/organizations/${createOrgKey(orgPost)}/details`,
      filterParamsObj,
    );

    return url.toString();
  }, [filterParamsObj, orgPost]);

  return (
    <OrgCardWrapper href={href} isActive={isActive} onClick={onClick}>
      <OrgCardHeader orgPost={orgPost} />
      <OrgCardTags orgPost={orgPost} />
      <OrgCardTechs techs={[]} />
    </OrgCardWrapper>
  );
};

export default memo(OrgCard);
