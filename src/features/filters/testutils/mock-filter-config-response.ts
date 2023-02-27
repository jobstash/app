import { rest } from 'msw';

import { API_MW_URL } from '~/shared/core/constants';
import type { GenericResponse } from '~/shared/core/interfaces';

import type { FilterConfig } from '../core/interfaces';

export const mockFilterConfigResponse = (
  status: number,
  body: FilterConfig | GenericResponse,
  delay = 0,
  networkError = false,
) => {
  rest.get(`${API_MW_URL}/jobs/filters`, (_req, res, ctx) => {
    if (networkError) {
      return res.networkError('network error');
    }

    return res(ctx.status(status), ctx.json(body), ctx.delay(delay));
  });
};
