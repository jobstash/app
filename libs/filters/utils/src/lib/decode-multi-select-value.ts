import { decodeBase64 } from '@jobstash/shared/utils';

export const decodeMultiSelectValue = (value: string) =>
  value
    .split(',')
    .map((v) => decodeBase64(v))
    .join(',');
