import { Avatar, Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  avatar: string;
}

export const AccountText = ({ text, avatar }: Props) => (
  <div className="flex items-center gap-3">
    <Avatar isRounded src={avatar} alt={text} size="sm" />
    <Text fw="bold">{text}</Text>
  </div>
);
