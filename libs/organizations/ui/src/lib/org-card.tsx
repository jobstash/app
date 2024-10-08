import { memo, useMemo } from 'react';

import { useSetAtom } from 'jotai';

import { type OrgListItem } from '@jobstash/organizations/core';
import { EVENT_CARD_CLICK, FRONTEND_URL } from '@jobstash/shared/core';
import { getUrlWithParams } from '@jobstash/filters/utils';
import { createOrgKey } from '@jobstash/organizations/utils';

import { activeOrgIdAtom } from '@jobstash/organizations/state';

import OrgCardHeader from './org-card-header';
import OrgCardTags from './org-card-tags';
import OrgCardWrapper from './org-card-wrapper';

interface Props {
  orgListItem: OrgListItem;
  isActive: boolean;
  filterParamsObj: Record<string, string>;
}

const OrgCard = ({ orgListItem, isActive, filterParamsObj }: Props) => {
  const { orgId, name } = orgListItem;

  const setActiveOrgId = useSetAtom(activeOrgIdAtom);

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
  };

  return (
    <OrgCardWrapper href={href} isActive={isActive} onClick={onClick}>
      <OrgCardHeader orgListItem={orgListItem} />
      <OrgCardTags orgListItem={orgListItem} />
    </OrgCardWrapper>
  );
};

export default memo(OrgCard);
