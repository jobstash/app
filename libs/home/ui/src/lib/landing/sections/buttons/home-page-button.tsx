import { Button } from '@nextui-org/button';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  hasBorder?: boolean;
  onClick?: () => void;
}

export const HomePageButton = ({ text, hasBorder, onClick }: Props) => (
  <Button
    className="h-11 w-96 rounded-lg bg-white/5"
    style={{
      border: '2px solid transparent',
      ...(hasBorder ? gradientStyles : undefined),
    }}
    onClick={onClick}
  >
    <Text fw="bold">{text}</Text>
  </Button>
);

const gradientStyles = {
  background:
    'linear-gradient(90deg, #1F1F23, #1F1F23) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
};
