import { Lato, Roboto } from '@next/font/google';

export const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const lato = Lato({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
});
