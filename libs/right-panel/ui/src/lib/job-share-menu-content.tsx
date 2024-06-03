/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';

import { FRONTEND_URL } from '@jobstash/shared/core';
import { normalizeString, notifSuccess } from '@jobstash/shared/utils';

import { ShareMenuContent } from '@jobstash/shared/ui';

const TITLE = 'Share Job';
const CHECKBOX_LABEL = 'Filter by hiring org';
const LINK_COPIED_TITLE = 'Link copied to clipboard!';
const LINK_COPIED_MESSAGE = 'You can now share the job link.';

interface Props {
  shortUUID: string;
  orgName: string;
}

export const JobShareMenuContent = ({ shortUUID, orgName }: Props) => {
  const [filterByHiringOrg, setFilterByHiringOrg] = useState(false);

  const onValueChange = (isSelected: boolean) => {
    setFilterByHiringOrg(isSelected);
  };

  const onClickCopyLink = () => {
    const url = new URL(`${FRONTEND_URL}/jobs/${shortUUID}/details`);

    if (filterByHiringOrg) {
      url.searchParams.append('organizations', normalizeString(orgName)!);
    }

    navigator.clipboard.writeText(url.toString());

    notifSuccess({
      title: LINK_COPIED_TITLE,
      message: LINK_COPIED_MESSAGE,
    });
  };

  const checkboxProps = {
    label: CHECKBOX_LABEL,
    isSelected: filterByHiringOrg,
    onValueChange,
  };

  return (
    <ShareMenuContent
      title={TITLE}
      checkboxProps={checkboxProps}
      onClickCopyLink={onClickCopyLink}
    />
  );
};
