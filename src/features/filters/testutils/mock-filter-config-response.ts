import { rest } from 'msw';

import type { GenericResponse } from '~/shared/core/interfaces';

import { API_URL_JOBS_FILTER_CONFIG } from '../core/constants';
import type { FilterConfig } from '../core/interfaces';

export const mockFilterConfigResponse = (
  status: number,
  body: FilterConfig | GenericResponse,
  delay = 0,
  networkError = false,
) => {
  rest.get(API_URL_JOBS_FILTER_CONFIG, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
};
