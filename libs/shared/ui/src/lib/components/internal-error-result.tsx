import Image from 'next/image';

import Heading from '../base/heading';
import Text from '../base/text';

const InternalErrorResult = () => (
  <div className="flex flex-col items-center justify-center space-y-8 rounded-3xl bg-white/5 p-12 mt-8">
    <div className="pt-12">
      <Image
        priority
        src="/vortex.png"
        quality={100}
        alt="Serious Error"
        width={300}
        height={300}
        className="animate-spin-slow"
      />
    </div>

    <div className="flex flex-col items-center gap-y-2">
      <Heading size="xl" fw="bold">
        Serious Error
      </Heading>
      <div className="max-w-sm text-center flex flex-col gap-2">
        <Text color="dimmed">
          All shortcuts have disappeared. Screen. Mind. Both are blank
        </Text>
      </div>
    </div>
  </div>
);

export default InternalErrorResult;
