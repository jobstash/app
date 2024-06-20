import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { NotFoundInfo } from '@jobstash/shared/core';

import { Button, Heading, NotFoundSvg, Text } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  notFoundInfo?: NotFoundInfo;
}

const DEFAULT_NOT_FOUND_INFO = {
  link: '/',
  title: 'Nothing Here',
  message: "We could not find the content you're looking for",
  buttonText: 'Go to Home Page',
};

export const NotFoundPage = ({ notFoundInfo }: Props) => {
  const { link, title, message, buttonText } =
    notFoundInfo ?? DEFAULT_NOT_FOUND_INFO;

  const router = useRouter();
  const onClick = useCallback(() => {
    router.replace(link ?? '/');
  }, [link, router]);

  return (
    <div className="w-full lg:pl-52">
      <SideBar />

      <div className="flex h-screen items-center justify-center lg:pl-4">
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
    </div>
  );
};
