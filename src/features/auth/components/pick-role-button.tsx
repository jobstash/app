import { MouseEventHandler } from 'react';

import { Text } from '~/shared/components';

import { PickRoleIcon } from './pick-role-icon';

interface Props {
  text: string;
  icon: 'email' | 'github';
  onClick?: MouseEventHandler;
}

export const PickRoleButton = ({ text, icon, onClick }: Props) => (
  <button
    className="flex items-center justify-center rounded-lg bg-zinc-800 py-3 transition duration-150 ease-in-out hover:bg-zinc-700 active:bg-zinc-800"
    onClick={onClick}
  >
    <PickRoleIcon filename={icon} />
    <Text fw="semibold" size="sm">
      {text}
    </Text>
  </button>
);
