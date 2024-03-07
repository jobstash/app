import { prettyTimestamp } from '~/shared/utils/pretty-timestamp';

interface Props extends TimestampProps {}

export const JobCardTsBookmark = ({ timestamp }: Props) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 md:justify-end">
      <Timestamp timestamp={timestamp} />
      <Bookmark />
    </div>
  );
};

interface TimestampProps {
  timestamp: number;
}

const Timestamp = ({ timestamp }: TimestampProps) => {
  const ts = prettyTimestamp(timestamp);
  return <span className="text-xs">{ts}</span>;
};

const Bookmark = () => {
  return <div>{'[___]'}</div>;
};
