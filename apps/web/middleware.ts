import { NextRequest, NextResponse } from 'next/server';

import { ENABLE_BASIC_AUTH } from '@jobstash/shared/core';

const whiteListed = [
  'jobs/ava-labs-senior-infrastructure-engineer-3oxfCO/details',
  'JobStash.svg',
  'favicon.ico',
  '_next',
  'Logo-01.svg',
  'Logo-02.svg',
  'JobStash-Wordmark-800.png',
  'JobStash.svg',
  'site.webmanifest',
];

const getIsWhiteListed = (url: string) => {
  for (const str of whiteListed) {
    if (url.includes(str)) return true;
  }

  return false;
};

export function middleware(req: NextRequest) {
  if (typeof ENABLE_BASIC_AUTH === 'string' && ENABLE_BASIC_AUTH === 'true') {
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;
    const isWhiteListed = getIsWhiteListed(url.toString());

    if (isWhiteListed) {
      return NextResponse.next();
    }

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'gotrekt' && pwd === 'mcdonalds') {
        return NextResponse.next();
      }
    }

    url.pathname = '/api/auth';

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
