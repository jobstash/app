import { NextRequest, NextResponse } from 'next/server';

const whiteListed = [
  'uniswap-labs-senior-backend-engineer-1pN28S',
  'JobStash.svg',
  'favicon.ico',
  '_next',
  'Logo-01.svg',
  'Logo-02.svg',
  'JobStash-Wordmark-800.png',
];

const getIsWhiteListed = (url: string) => {
  for (const str of whiteListed) {
    if (url.includes(str)) return true;
  }

  return false;
};

export function middleware(req: NextRequest) {
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
