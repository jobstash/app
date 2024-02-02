import { memo, type ReactNode } from 'react';

import { prettyTimestamp } from '@jobstash/shared/utils';

import { Heading, Text } from '@jobstash/shared/ui';

interface Props {
  title: string;
  ts: number;
  isFeatured: boolean;
  bookmarkButton: ReactNode;
}

const JobCardHeader = ({ title, ts, isFeatured, bookmarkButton }: Props) => {
  const timestamp = prettyTimestamp(ts);

  return (
    <div className="sm:flex items-center justify-between">
      {isFeatured ? (
        <div style={featuredButtonStyle}>
          <Text size="sm" fw="bold">
            Featured
          </Text>
        </div>
      ) : (
        <Heading size="md" fw="semibold">
          {title}
        </Heading>
      )}
      <hr className="border-t border-white/10 hidden sm:flex" />
      <div className="hidden items-center sm:flex h-full min-w-fit gap-4">
        <span className="text-sm">{timestamp}</span>

        {bookmarkButton}
      </div>
    </div>
  );
};

export default memo(JobCardHeader);

const featuredButtonStyle: React.CSSProperties = {
  width: '113px',
  height: '29px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  background: 'linear-gradient(270deg, #D58701, #8743FF, #4436F1)',
  backgroundSize: '400% 400%',
  animation: 'featuredbg 5s ease infinite',
  WebkitAnimation: 'featuredbg 5s ease infinite',
  MozAnimation: 'featuredbg 5s ease infinite',
};
