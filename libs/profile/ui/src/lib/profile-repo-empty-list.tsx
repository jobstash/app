import Image from 'next/image';
import { memo } from 'react';

import { Heading, Text } from '@jobstash/shared/ui';

const ProfileRepoEmptyList = () => (
  <div className="flex flex-col items-center justify-center space-y-8 rounded-3xl bg-white/5 p-8">
    <div className="pt-16">
      <Image
        priority
        src="/empty-result.png"
        quality={100}
        alt="Empty result"
        width={418}
        height={297}
      />
    </div>

    <div className="flex flex-col items-center gap-y-2">
      <Heading size="xl" fw="semibold">
        Nothing Here...
      </Heading>
      <div className="max-w-xs text-center">
        <Text color="dimmed">
          You don&#39;t have any repositories attached to your account.
        </Text>
      </div>
    </div>
  </div>
);

export default memo(ProfileRepoEmptyList);
