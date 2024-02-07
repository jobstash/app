import { memo } from 'react';

import { REPORT_UI_CTX } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { CardMenu, LogoTitle, ReportMenuItem } from '@jobstash/shared/ui';

interface Props {
  id: string;
  name: string;
  url: string;
  logo: string | null;
}

const RightPanelProjectCardTitle = ({ id, name, url, logo }: Props) => {
  const other = JSON.stringify({ project: { id, name, url, logo } });

  return (
    <div className="flex h-fit w-full items-center justify-between gap-2 relative">
      <LogoTitle
        title={name}
        avatarProps={{
          src: getLogoUrl(url, logo),
          alt: name,
        }}
      />
      <CardMenu>
        <ReportMenuItem ui={REPORT_UI_CTX.PROJECT_DETAILS_CARD} other={other} />
      </CardMenu>
    </div>
  );
};

export default memo(RightPanelProjectCardTitle);
