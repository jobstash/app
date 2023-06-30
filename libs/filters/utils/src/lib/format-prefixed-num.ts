import { numFormatter } from '@jobstash/shared/utils';

export const formatPrefixedNum = (num: number, prefix: string | null) =>
  `${prefix ?? ''}${numFormatter.format(num)}`;
