import { Text } from '@jobstash/shared/ui';

export const OneClickTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Instant Job Connects
      </Text>
      <Text className="text-white/70">
        Skip lengthy application forms; Say goodbye to the tedious and
        repetitive task of completing application forms for every job!
      </Text>
      <Text className="text-white/70">
        Stand out to hiring managers with our unique ability to highlight
        skilled crypto-native developers.
      </Text>
    </div>
  </div>
);
