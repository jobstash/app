import { Text } from '@jobstash/shared/ui';

export const EligibleTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Fast-Track Apply
      </Text>
      <Text className="text-white/70">
        You are eligible for Fast-Track application! Apply quickly and
        efficiently to get noticed by hiring managers.
      </Text>
      <Text className="text-white/70">
        Benefit from our streamlined application process and stand out to
        employers looking for top talent.
      </Text>
    </div>
  </div>
);
