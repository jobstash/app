import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  title: string;
  description: string;
}

const ProfileOnboardCard = (props: Props) => {
  const { title, description } = props;

  return (
    <div className="flex flex-col gap-3 z-50">
      <Heading size="lg">{title}</Heading>
      <Text color="dimmed">{description}</Text>
    </div>
  );
};

export default ProfileOnboardCard;
