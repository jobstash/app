import { memo } from 'react';

import { encodeBase64 } from '@jobstash/shared/utils';

import RightPanelCta from './right-panel-cta';

interface Props {
  name: string;
}

const RightPanelProjectCardExploreButton = ({ name }: Props) => (
  <>
    <div className="flex h-4 flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    <RightPanelCta
      external
      link={`/jobs?projects=${encodeBase64(name)},`}
      text="Explore Project"
    />
  </>
);

export default memo(RightPanelProjectCardExploreButton);
