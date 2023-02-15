import Image from 'next/image';

/** List of tag icon filenames */
const sidebarIcons = [
  'bookmark',
  'jobs',
  'orgs',
  'projects',
  'repos',
  'right-caret',
] as const;

interface Props {
  filename: (typeof sidebarIcons)[number];
}

export const SidebarIcon = ({ filename }: Props) => (
  <Image
    priority
    src={`/icons/sidebar/${filename}.png`}
    width="16"
    height="16"
    alt={filename}
    className="self-center"
  />
);
