import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { SUPPORT_TELEGRAM_URL } from '@jobstash/shared/core';

export const AssistSection = () => (
  <div className="flex flex-col items-center px-6 gap-10">
    <div className="max-w-3xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Want to Talk Options?
      </h2>
      <p className="text-lg leading-8 text-white/90 max-w-2xl">
        For custom pricing arrangements that fit your needs perfectly, please
        contact us. Contact us and we&apos;ll craft a custom quote based on your
        needs.
      </p>
    </div>
    <div className="flex items-center gap-x-6">
      <Button
        as={Link}
        href={SUPPORT_TELEGRAM_URL}
        radius="sm"
        rel="noopener noreferrer"
        target="_blank"
      >
        Contact Support
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/employers">
        Services <span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);
