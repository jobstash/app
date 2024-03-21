import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import { Text } from '@jobstash/shared/ui';

interface Props {
  text: string;
  url?: string;
  hasBorder?: boolean;
  external?: boolean;
}

export const HomePageButton = ({
  text,
  url,
  hasBorder,
  external = true,
}: Props) => {
  const content = <Text fw="bold">{text}</Text>;
  const style = {
    border: '2px solid transparent',
    ...(hasBorder ? gradientStyles : undefined),
  };

  if (url) {
    return (
      <Button
        as={Link}
        href={url}
        className="h-11 min-w-[180px] rounded-lg bg-white/5"
        style={style}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button className="h-11 min-w-[180px] rounded-lg bg-white/5" style={style}>
      {content}
    </Button>
  );
};

const gradientStyles = {
  background:
    'linear-gradient(90deg, #1F1F23, #1F1F23) padding-box, linear-gradient(90deg, #8743FF, #D68800) border-box',
};
