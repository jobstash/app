import { useRouter } from 'next/router';

import { FRONTEND_URL } from '@jobstash/shared/core';
import { notifSuccess } from '@jobstash/shared/utils';

import Button from '../base/button/button';
import Heading from '../base/heading';
import Text from '../base/text';
import { FoxSVG } from '../components/fox-svg';

const MobileSupportPage = () => {
  const { asPath } = useRouter();

  const onClick = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${FRONTEND_URL}${asPath}`);
      notifSuccess({
        title: 'Copied to Clipboard!',
        message: 'You have copied the current URL',
      });
    }
  };

  return (
    <div className="flex flex-col lg:hidden items-center justify-center text-center min-h-screen px-4 gap-4">
      <FoxSVG isMobile />

      <Heading size="md">Feature Not Available on Smaller Devices</Heading>

      <div className="max-w-md pb-4">
        <Text color="dimmed" size="sm">
          This feature is currently optimized for desktop. Please switch to a
          desktop device to access all functionalities.
        </Text>
      </div>

      <Button variant="primary" onClick={onClick}>
        <Text fw="semibold" size="sm">
          Copy Page URL
        </Text>
      </Button>
    </div>
  );
};

export default MobileSupportPage;
