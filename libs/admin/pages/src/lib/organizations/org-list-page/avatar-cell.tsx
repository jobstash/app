/* eslint-disable @next/next/no-img-element */

import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgItem } from '@jobstash/admin/core';
import { getLogoUrl } from '@jobstash/shared/utils';

export const AvatarCell = (props: CustomCellRendererProps<OrgItem>) => {
  const { data } = props;

  const url = data && data.websites.length > 0 ? data.websites[0] : '';
  const logoUrl = data?.logoUrl;
  const src = getLogoUrl(url, logoUrl);
  const name = data?.name ?? '';

  return (
    <div>
      <img src={src} alt={name} className="w-10 h-10" />
    </div>
  );
};
