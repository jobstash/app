import { Avatar, Text } from '@jobstash/shared/ui';

interface Props {
  label: string;
  avatar: string;
  text: string;
}

const ConnectedAccount = ({ label, avatar, text }: Props) => (
  <>
    <div className="text-center">
      <Text size="sm" color="dimmed">
        {label}
      </Text>
    </div>
    <div className="flex items-center justify-center gap-3">
      <Avatar isRounded src={avatar} alt={`${text}'s avatar`} size="xs" />
      <Text fw="semibold">{text}</Text>
    </div>
  </>
);

export default ConnectedAccount;
