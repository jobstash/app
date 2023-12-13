import { NextRequest, NextResponse } from 'next/server';

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
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;
  const isWhiteListed = getIsWhiteListed(url.toString());

  if (isWhiteListed) {
    const res = NextResponse.next();
    res.cookies.set('msgx', 'henlo whitelisted');

    if (Object.keys(req.cookies).length > 0) {
      res.cookies.set('mwReqCookiesWL', JSON.stringify(req.cookies));
    }

    return res;
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === 'gotrekt' && pwd === 'mcdonalds') {
      const res = NextResponse.next();
      res.cookies.set('msg', 'hello from middleware!');

      if (Object.keys(req.cookies).length > 0) {
        res.cookies.set('mwReqCookies', JSON.stringify(req.cookies));
      }

      return res;
    }
  }

  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
}
