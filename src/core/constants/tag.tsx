import {
  AuditTagIcon,
  CoinsTagIcon,
  Dollar2TagIcon,
  DollarTagIcon,
  FoldersTagIcon,
  RunTagIcon,
  ShoppingBagTagIcon,
  SkullTagIcon,
} from '~/features/unstyled-ui/icons';

// UNOFFICIAL: made to just to generate random tag icons
export const tagIconMap = {
  dollar: <DollarTagIcon />,
  dollar2: <Dollar2TagIcon />,
  folders: <FoldersTagIcon />,
  bag: <ShoppingBagTagIcon />,
  run: <RunTagIcon />,
  coins: <CoinsTagIcon />,
  audit: <AuditTagIcon />,
  skull: <SkullTagIcon />,
};

// TEMPORARY: map tag to icon
export const getTagIcon = (key: string) =>
  tagIconMap[key as keyof typeof tagIconMap];
