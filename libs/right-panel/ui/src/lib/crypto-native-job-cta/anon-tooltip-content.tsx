import { Text } from '@jobstash/shared/ui';

export const AnonTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Check Fast-Track Access
      </Text>
      <Text className="text-white/70">
        Find out if you are eligible for our Fast-Track application process and
        get connected with hiring managers quickly.
      </Text>
      <Text className="text-white/70">
        Leverage your skills and experience to gain priority access to job
        opportunities.
      </Text>
    </div>
  </div>
);
