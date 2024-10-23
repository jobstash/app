import { Text } from '@jobstash/shared/ui';

export const AnonTooltipContent = () => (
  <div className="flex flex-col gap-8 max-w-sm p-4 bg-darker-gray">
    <div className="flex flex-col gap-2">
      <Text fw="bold" size="lg">
        Check if you qualify as Expert
      </Text>
      <Text className="text-white/70">
        Qualifying candidates receive free personalized advice on how to apply
        successfully for this job, along with our advocacy with the hiring
        manager. To determine your eligibility, connect your wallet and GitHub
        account, or verify your current work email. We will review your work
        history and automatically approve you if you qualify.
      </Text>
      <Text className="text-white/70">
        Qualification criteria: You must have verified OSS contributions in a
        repository owned by one of the organizations we track, or a verified
        work email from one of these organizations. We also accept Hackathon NFT
        Packs issued by EthGlobal, starting from the builder tier, or a Nouns
        DAO NFT.
      </Text>
    </div>
  </div>
);
