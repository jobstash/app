/* eslint-disable @next/next/no-img-element */

import { getLogoUrl } from '@jobstash/shared/utils';

interface Props {
  url: string;
  name?: string;
  logo?: string | null;
}

export const GridAvatarCellRenderer = ({ url, logo, name }: Props) => (
  <div>
    <img src={getLogoUrl(url, logo)} alt={name ?? ''} className="w-10 h-10" />
  </div>
);
