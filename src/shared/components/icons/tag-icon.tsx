import Image from 'next/image';

/** List of tag icon filenames */
const tagIcons = [
  'active-user',
  'audit',
  'category',
  'chain',
  'code',
  'discord',
  'funding',
  'git-branch',
  'github',
  'hacks',
  'level',
  'link',
  'linkedin',
  'location',
  'money',
  'monthly-volume',
  'revenue',
  'suitcase',
  'token',
  'tvl',
  'twitter',
  'typeof-work',
  'users-three',
  'users',
  'utc',
  'web',
] as const;

interface Props {
  filename: (typeof tagIcons)[number];
}

export const TagIcon = ({ filename }: Props) => (
  <Image
    src={`/icons/tags/${filename}.png`}
    width="13"
    height="13"
    alt={filename}
  />
);
