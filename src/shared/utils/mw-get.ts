import { notFound } from 'next/navigation';

import { z } from 'zod';

import { errMsg, ResponseError } from '~/shared/core/errors';

interface Props<T> {
  url: string;
  label: string;
  responseSchema: T;
  options?: RequestInit;
}

export const mwGET = async <T extends z.ZodTypeAny>(props: Props<T>) => {
  if (typeof window !== 'undefined' && !window.navigator.onLine) {
    throw new Error(errMsg.OFFLINE);
  }

  const { url, responseSchema, options } = props;

  try {
    const res = await fetch(url, { method: 'GET', ...options });

    if (!res.ok) {
      throw new ResponseError(errMsg.ERR_RESPONSE, res);
    }

    const jsonData = await res.json();
    const result = responseSchema.safeParse(jsonData);
    if (!result.success) {
      throw new ResponseError(
        errMsg.INVALID_RESPONSE_SCHEMA,
        res,
        JSON.stringify({ result }),
      );
    }

    return result.data as z.infer<typeof responseSchema>;
  } catch (err: unknown) {
    if (err instanceof ResponseError) {
      if (err.res.status === 404) {
        notFound();
      }

      if (err.res.status === 400) {
        const jsonRes = await err.res.json();
        throw new Error((jsonRes as Error).message);
      }

      // TODO: sentry w/ response ctx
      throw new Error(errMsg.INTERNAL);
    } else {
      // TODO: sentry
      throw new Error(errMsg.INTERNAL);
    }
  }
};
