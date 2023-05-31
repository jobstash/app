const MINUTE_MS = 1000 * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;
const WEEK_MS = DAY_MS * 7;
const MONTH_MS = DAY_MS * 30;
const YEAR_MS = MONTH_MS * 12;

const UNIT_MINUTE = 'minute';
const UNIT_HOUR = 'hour';
const UNIT_DAY = 'day';
const UNIT_WEEK = 'week';
const UNIT_MONTH = 'month';
const UNIT_YEAR = 'year';

const unitFactorMap = {
  [UNIT_MINUTE]: MINUTE_MS,
  [UNIT_HOUR]: HOUR_MS,
  [UNIT_DAY]: DAY_MS,
  [UNIT_WEEK]: WEEK_MS,
  [UNIT_MONTH]: MONTH_MS,
  [UNIT_YEAR]: YEAR_MS,
};

const createPrettyTimestamp = (
  elapsed: number,
  unit: keyof typeof unitFactorMap,
) => {
  const interval = Math.floor(elapsed / unitFactorMap[unit]);

  return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
};

/**
 * Converts timestamp into pretty strings e.g. "3 days ago etc"
 * @param ts - timestamp in milliseconds
 */
export const prettyTimestamp = (ts: number) => {
  const elapsed = Date.now() - ts;

  if (elapsed < MINUTE_MS) return 'Just now';
  if (elapsed < HOUR_MS) return createPrettyTimestamp(elapsed, UNIT_MINUTE);
  if (elapsed < DAY_MS) return createPrettyTimestamp(elapsed, UNIT_HOUR);
  if (elapsed < WEEK_MS) return createPrettyTimestamp(elapsed, UNIT_DAY);
  if (elapsed < MONTH_MS) return createPrettyTimestamp(elapsed, UNIT_WEEK);
  if (elapsed < YEAR_MS) return createPrettyTimestamp(elapsed, UNIT_MONTH);

  return createPrettyTimestamp(elapsed, UNIT_YEAR);
};
