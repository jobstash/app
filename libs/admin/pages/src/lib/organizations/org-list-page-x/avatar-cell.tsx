/* eslint-disable @next/next/no-img-element */

import { CustomCellRendererProps } from "ag-grid-react";

import { OrgRowItem } from "@jobstash/admin/core";
import { getLogoUrl } from "@jobstash/shared/utils";


export const AvatarCell = (props: CustomCellRendererProps<OrgRowItem>) => {
  const { data } = props;

  const url = data && data.website.length > 0 ? data.website[0] : '';
  const logoUrl = data?.logoUrl;
  const src = getLogoUrl(url, logoUrl);
  const name = data?.name ?? ''

  return (
    <div>
      {/* <Avatar key={src} src={src} alt={name} size='xs' /> */}
      <img src={src} alt={name} className="w-10 h-10" />
    </div>
  )
}
