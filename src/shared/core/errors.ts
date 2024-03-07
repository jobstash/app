export class ResponseError extends Error {
  res: Response;
  info: string | null;

  constructor(message: string, res: Response, info?: string) {
    super(message);
    this.res = res;
    this.info = info ?? null;
  }
}

export const errMsg = {
  ERR_RESPONSE: 'Non 200 Response',
  INTERNAL: 'Something went wrong :(',
  INVALID_JSON: 'Invalid JSON Response',
  INVALID_RESPONSE_SCHEMA: 'Invalid response schema',
  OFFLINE: 'No internet connection',
  NOT_FOUND: '404 Not Found',
} as const;
