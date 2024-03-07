'use client';

import { PrimaryButton } from '~/shared/components/primary-button';

interface Props {
  text: string;
}

export const DetailsPanelCTA = ({ text }: Props) => {
  return <PrimaryButton text={text} />;
};
