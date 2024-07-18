import React from 'react';

import { Avatar, Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  avatar: string;
  subText?: React.ReactNode;
}

export const AccountText = ({ text, avatar, subText }: Props) => (
  <div className="flex items-center gap-3">
    <Avatar isRounded src={avatar} alt={text} size="sm" />
    <div className="flex flex-col">
      <Text fw="bold">{text}</Text>
      {subText}
    </div>
  </div>
);
