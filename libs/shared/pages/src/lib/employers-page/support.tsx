import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

export const SupportSection = () => (
  <div className="flex flex-col items-center px-6 gap-10">
    <div className="max-w-3xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Need Help? We&#39;re Here for You
      </h2>
      <p className="text-lg leading-8 text-white/90 max-w-2xl">
        Got questions or need assistance? Our team is ready to help you with any
        inquiries. Reach out to us and get the support you need.
      </p>
    </div>
    <div className="flex items-center gap-x-6">
      <Button
        as={Link}
        href={ORG_SIGNUP_FORM_URL}
        className="bg-gradient-to-l from-primary to-tertiary font-bold"
        radius="sm"
      >
        Contact Support
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/post-job">
        Learn more <span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);