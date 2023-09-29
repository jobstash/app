import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { type NotFoundInfo } from '@jobstash/shared/core';

import Button from '../base/button/button';
import Heading from '../base/heading';
import Text from '../base/text';
import NotFoundSvg from '../components/not-found-svg';

interface Props {
  notFoundInfo?: NotFoundInfo;
}

const DEFAULT_NOT_FOUND_INFO = {
  link: '/',
  title: 'Nothing Here',
  message: "We could not find the content you're looking for",
  buttonText: 'Go to Home Page',
};

const NotFoundPage = ({ notFoundInfo }: Props) => {
  const { link, title, message, buttonText } =
    notFoundInfo ?? DEFAULT_NOT_FOUND_INFO;

  const router = useRouter();
  const onClick = useCallback(() => {
    router.replace(link ?? '/');
  }, [link, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-8 p-12">
        <NotFoundSvg />

        <div className="flex flex-col items-center gap-y-2">
          <Heading size="xl" fw="semibold">
            {title}
          </Heading>
          <div className="max-w-sm text-center w-full">
            <Text color="dimmed">{message}</Text>
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            textProps={{ fw: 'semibold' }}
            size="md"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
