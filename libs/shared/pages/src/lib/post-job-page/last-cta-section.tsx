import Link from 'next/link';

import { Button } from '@nextui-org/react';

export const LastCtaSection = () => (
  <div className="flex flex-col items-center px-6 gap-10">
    <div className="max-w-2xl text-center flex flex-col gap-6">
      <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Build Your Dream Team
      </h2>
      <p className="text-lg leading-8 text-white/90">
        Take the first step in attracting talented professionals by posting your
        job today. Our platform ensures your job gets noticed by the right
        candidates, with enhanced visibility and easy management.
      </p>
    </div>
    <div className="flex items-center gap-x-6">
      <Button
        className="bg-gradient-to-l from-primary to-tertiary font-bold"
        radius="sm"
      >
        Post Your Job
      </Button>
      <Button variant="light" radius="sm" as={Link} href="/hiring">
        Learn more <span aria-hidden="true">→</span>
      </Button>
    </div>
  </div>
);
