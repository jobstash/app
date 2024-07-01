import { useSetAtom } from 'jotai';

import { ProfileGotItCardStatus } from '@jobstash/profile/core';

import { showGotItCardAtom } from '@jobstash/profile/state';

import { Button } from '@jobstash/shared/ui';

interface Props {
  gotItCardKey: keyof ProfileGotItCardStatus;
}

export const ProfileHeaderInfoButton = ({ gotItCardKey }: Props) => {
  const setShowGotItCard = useSetAtom(showGotItCardAtom);

  const onClickGotItCardHelper = () => {
    setShowGotItCard((prev) => ({
      ...prev,
      [gotItCardKey]: !prev[gotItCardKey],
    }));
  };

  return (
    <Button isIcon onClick={onClickGotItCardHelper}>
      [ ? ]
    </Button>
  );
};
