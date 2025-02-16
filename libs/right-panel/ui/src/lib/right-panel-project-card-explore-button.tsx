import { useRouter } from 'next/router';
import { memo } from 'react';

import RightPanelCta from './right-panel-cta';

interface Props {
  name: string;
}

const RightPanelProjectCardExploreButton = ({ name }: Props) => (
  //
  // const router = useRouter();
  // const onClick = () => {
  //   router.push(`/jobs?projects=${name},`);
  // };

  <>
    <div className="flex h-4 flex-col justify-center">
      <hr className="border-t border-white/10" />
    </div>

    {/* <RightPanelCta text="Explore Project" onClick={onClick} /> */}
  </>
);
export default memo(RightPanelProjectCardExploreButton);
