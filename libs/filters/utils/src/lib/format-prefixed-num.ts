import { numFormatter } from '@jobstash/shared/utils';

export const formatPrefixedNum = (num: number, prefix?: string) =>
  `${prefix ?? ''}${numFormatter.format(num)}`;
