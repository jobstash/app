import { Text } from '@jobstash/shared/ui';

export const DirectApplyTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        JobStash Got Your Back!
      </Text>
      <Text className="text-white/70">
        {`We don't gatekeep talent - and don't get payed by organizations to
        introduce you.`}
      </Text>
      <Text className="text-white/70">
        Please support us and mention JobStash when you apply so we gain
        visibility in the ecosystem.
      </Text>
    </div>
  </div>
);
