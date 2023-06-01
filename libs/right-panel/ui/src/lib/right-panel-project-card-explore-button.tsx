import { useRouter } from 'next/router';
import { memo } from 'react';

import { encodeBase64 } from '@jobstash/shared/utils';

import { Button } from '@jobstash/shared/ui';

interface Props {
  name: string;
}

const RightPanelProjectCardExploreButton = ({ name }: Props) => {
  const { push } = useRouter();

  return (
    <>
      <div className="flex h-4 flex-col justify-center">
        <hr className="border-t border-white/10" />
      </div>

      <Button
        variant="primary"
        onClick={() => {
          push(`/jobs?projects=${encodeBase64(name)},`, undefined, {
            shallow: true,
          });
        }}
      >
        Explore Project
      </Button>
    </>
  );
};

export default memo(RightPanelProjectCardExploreButton);
