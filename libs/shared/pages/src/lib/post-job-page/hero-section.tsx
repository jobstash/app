import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@nextui-org/react';

import { ORG_SIGNUP_FORM_URL } from '@jobstash/shared/core';

export const HeroSection = () => (
  <div className="max-w-7xl px-6 pt-10 lg:flex lg:px-8">
    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 flex flex-col gap-8">
      <div className="mt-24 sm:mt-32 lg:mt-16 flex flex-col gap-2">
        <h1 className="bg-gradient-to-r from-white to-secondary quinary bg-clip-text text-8xl font-bold text-transparent">
          Post jobs for your organization
        </h1>
        <div className="flex gap-2 items-center">
          <h2 className="bg-gradient-to-r from-white to-secondary quinary bg-clip-text text-3xl font-bold text-transparent">
            for{' '}
            <span className="bg-gradient-to-r from-secondary/10 via-secondary/40 to-[#D68800]/80 bg-clip-text text-3xl font-bold text-transparent">
              FREE
            </span>
          </h2>
          <span role="img" aria-label="flame" className="text-3xl">
            🔥
          </span>
        </div>
      </div>

      <p className="text-xl leading-7 text-white/90">
        JobStash is built different. We belive that posting jobs should be easy
        and free for everyone. This way, you can focus on building your dream
        team without worrying about the cost. Get started now and post all your
        jobs at <span className="font-bold">zero</span> cost.
      </p>

      <div className="flex items-center gap-x-6">
        <Button
          as={Link}
          href={ORG_SIGNUP_FORM_URL}
          className="bg-gradient-to-l from-primary to-tertiary font-bold"
          radius="sm"
        >
          Post Your Jobs For Free
        </Button>
        <Button variant="light" radius="sm" as={Link} href="/employers">
          Learn more <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>

    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
      <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
        <Image
          alt="App screenshot"
          src="/jobs-page.png"
          width={2432}
          height={1442}
          className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
        />
      </div>
    </div>
  </div>
);
