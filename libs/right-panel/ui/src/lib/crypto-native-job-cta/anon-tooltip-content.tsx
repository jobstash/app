import { Text } from '@jobstash/shared/ui';

export const AnonTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Check Elite FastTrack Access
      </Text>
      <Text className="text-white/70">
        Find out if you are eligible for our Elite Fast Track application
        process and get connected with hiring managers quickly. To get started,
        connect your wallet and your github account, or verify your current work
        email.
      </Text>
      <Text className="text-white/70">
        We support crypto native builders by giving them priority access to some
        of the best opportunities in the space.
      </Text>
    </div>
  </div>
);
