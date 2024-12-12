import { Button, Spinner, Tooltip } from '@nextui-org/react';
import { Sparkles as SparklesIcon } from 'lucide-react';

import { cn, getPluralText } from '@jobstash/shared/utils';

import { useJobPromotePaymentUrl } from '@jobstash/jobs/state';

import { Text } from '@jobstash/shared/ui';

import { BasicFeatureTooltipContent } from './basic-feature-tooltip-content';
import { ExtendPromotionTooltipContent } from './extend-promotion-tooltip-content';

interface Props {
  id: string;
  isFeatured: boolean;
  isProtected: boolean;
  filterParams: Record<string, string>;
  endDate: number | null;
}

export const JobCardPromoteButton = ({
  id,
  isFeatured,
  isProtected,
  filterParams,
  endDate,
}: Props) => {
  const { isLoading, onClick } = useJobPromotePaymentUrl({
    id,
    isProtected,
    filterParams,
    endDate,
  });

  const text = isFeatured ? 'Extend Promotion' : 'Promote';
  const icon = (
    <div className="h-4 w-4 flex items-center justify-center">
      {isLoading ? (
        <Spinner size="sm" color="white" />
      ) : (
        <SparklesIcon className="h-4 w-4" />
      )}
    </div>
  );

  const timeLeft = getTimeLeftText(endDate);
  const oneWeekText = getOneWeekText(endDate);

  const tooltipContent = isFeatured ? (
    // <div className="flex flex-col p-2 w-[320px]">
    //   <h3 className={cn('text-xl font-bold leading-8 text-white/90')}>
    //     Extend Promotion
    //   </h3>
    //   <span>Current promotion ends in {getOneWeekText(endDate)}</span>
    //   <span>(Expires in {getTimeLeftText(endDate)})</span>
    // </div>
    <ExtendPromotionTooltipContent
      timeLeft={timeLeft}
      oneWeekText={oneWeekText}
    />
  ) : (
    <BasicFeatureTooltipContent />
  );

  return (
    <Tooltip className="p-0" content={tooltipContent} delay={500}>
      <Button
        size="sm"
        isDisabled={isLoading}
        startContent={icon}
        className={cn('bg-white/5 font-bold', {
          'bg-white/10': isFeatured,
        })}
        onClick={onClick}
      >
        <Text size="sm" fw="bold">
          {text}
        </Text>
      </Button>
    </Tooltip>
  );
};

export const getTimeLeftText = (ts: number | null): string => {
  if (!ts) return '';

  const currentTimestamp = Date.now();
  const timeDifference = ts - currentTimestamp;

  if (timeDifference <= 0) return 'Time has passed';

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;

  const daysLeft = Math.floor(timeDifference / millisecondsPerDay);
  if (daysLeft > 0) return `${daysLeft} ${getPluralText('day', daysLeft)}`;

  const hoursLeft = Math.floor(timeDifference / millisecondsPerHour);
  if (hoursLeft > 0) return `${hoursLeft} ${getPluralText('hour', hoursLeft)}`;

  const minutesLeft = Math.floor(timeDifference / millisecondsPerMinute);
  return `${minutesLeft} ${getPluralText('minute', minutesLeft)}`;
};

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
const MONTHS_TEXT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getOneWeekText = (ts: number | null): string => {
  if (!ts) return '';
  const targetDate = new Date(ts + ONE_WEEK);
  const month = MONTHS_TEXT[targetDate.getMonth()];
  const date = targetDate.getDate();

  return `${month} ${date}`;
};
