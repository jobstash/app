import { cn, getPluralText } from '@jobstash/shared/utils';

import Text from '../base/text';

interface Props {
  community: string[];
  isOneLine?: boolean;
}

const OrgCommunityTag = ({ community, isOneLine }: Props) => {
  if (community.length === 0) return null;

  const communityCount = community.length;
  const prefix = `${getPluralText(communityPluralTuple, communityCount)}:`;

  return (
    <div
      className={cn('flex gap-2 items-center flex-wrap ml-[-2px]', {
        'shrink-0': isOneLine,
      })}
    >
      <Text size="sm">{`🏠 ${prefix}`}</Text>
      {community.map((text, i) => (
        <Text key={text} size="sm" className="mr-0.5">{`${text}${
          i < communityCount - 1 ? ',' : ''
        }`}</Text>
      ))}
    </div>
  );
};

export default OrgCommunityTag;

const communityPluralTuple = ['Communities', 'Community'] as [string, string];
