const getTimeStamp = (timestamp: Date | string) =>
  typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

/** Returns unit shorthand + plural form */
const getUnit = (num: number, unit: string) => `${unit}${num > 1 ? 's' : ''}`;

type PrettyDateUnits = 'min' | 'hour' | 'day' | 'week' | 'month' | 'year';

export const SECOND_MS = 1000;
export const MINUTE_MS = SECOND_MS * 60;
export const HOUR_MS = MINUTE_MS * 60;
export const DAY_MS = HOUR_MS * 24;
export const WEEK_MS = DAY_MS * 7;
export const MONTH_MS = DAY_MS * 30;
export const YEAR_MS = MONTH_MS * 12;

const prettyDate = (interval: number, str: PrettyDateUnits) => {
  const num = Math.floor(interval);

  const unit = getUnit(num, str);

  return `${num} ${unit} ago`;
};

const getUnitFn =
  (baseline: number, intervalFactor: number, unit: PrettyDateUnits) =>
  (_: Date, ms: number) =>
    ms < baseline ? prettyDate(Math.floor(ms / intervalFactor), unit) : '';

const getMinuteStr = getUnitFn(HOUR_MS, MINUTE_MS, 'min');
const getHourStr = getUnitFn(DAY_MS, HOUR_MS, 'hour');
const getWeekStr = getUnitFn(MONTH_MS - WEEK_MS, WEEK_MS, 'week');
const getMonthStr = getUnitFn(YEAR_MS, MONTH_MS, 'month');

const getJustNowStr = (_: Date, ms: number) =>
  ms < MINUTE_MS ? 'Just now' : '';

const getDayStr = (_: Date, ms: number) => {
  if (ms < WEEK_MS) {
    if (ms < 2 * DAY_MS) {
      return 'Yesterday';
    }

    return prettyDate(Math.floor(ms / DAY_MS), 'day');
  }

  return '';
};

const getYearStr = (ts: Date, ms: number, shorthand: boolean) => {
  const interval = Math.floor(ms / YEAR_MS);
  const dateOptions = {
    month: 'long',
    day: undefined,
    year: interval < 2 ? undefined : 'numeric',
  } as Intl.DateTimeFormatOptions;

  if (interval < 2) {
    return `Last ${ts.toLocaleDateString('en-US', dateOptions)}`;
  }

  return prettyDate(interval, 'year');
};

export const prettyUnix = (unix: number, shorthand = true): string => {
  const ts = getTimeStamp(new Date(unix));
  const ms = Date.now() - ts.getTime();

  const fnArr = [
    getJustNowStr,
    getMinuteStr,
    getHourStr,
    getDayStr,
    getWeekStr,
    getMonthStr,
    getYearStr,
  ];
  return fnArr
    .map((fn) => fn(ts, ms, shorthand))
    .find((s) => s !== '') as string;
};
