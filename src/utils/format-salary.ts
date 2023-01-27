import { Range } from '~/core/interfaces';
import { numFormatter } from '~/core/misc';

export const formatSalary = (range: Range) =>
  `$${numFormatter.format(range.min)} - $${numFormatter.format(
    range.max,
  )} / year`;
