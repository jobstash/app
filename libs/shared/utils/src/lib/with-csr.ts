/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const withCSR =
  <T extends { [key: string]: any }>(
    next: GetServerSideProps<T>,
    defaultReturn?: any,
  ) =>
  async (ctx: GetServerSidePropsContext) => {
    const isCSR = ctx.req.url?.startsWith('/_next');

    if (isCSR) {
      return (
        defaultReturn ?? {
          props: {},
        }
      );
    }

    return next?.(ctx);
  };
