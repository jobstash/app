import { ClassValue } from 'clsx';

import { InfoTagProps } from '~/shared/core/types';
import { cn } from '~/shared/utils/cn';

import { DraggableWrapper } from './draggable-wrapper';
import { InfoTag, InfoTagSkeleton } from './info-tag';

interface Props {
  tags: InfoTagProps[];
  compact?: boolean;
  draggable?: boolean;
  classNames?: {
    wrapper: ClassValue;
  };
}

export const InfoTags = ({ tags, compact, draggable, classNames }: Props) => {
  if (!tags.length) return null;

  const wrapperClassName = cn(WRAPPER_CLASSNAME, classNames?.wrapper);
  const content = (
    <>
      {tags.map((tag) => (
        <InfoTag key={tag.text} tag={tag} compact={compact} />
      ))}
    </>
  );

  if (draggable) {
    return (
      <DraggableWrapper className={wrapperClassName}>
        {content}
      </DraggableWrapper>
    );
  }

  return <div className={cn(wrapperClassName, 'flex-wrap')}>{content}</div>;
};

const WRAPPER_CLASSNAME = 'flex items-center gap-4';

interface SkeletonProps extends Pick<Props, 'compact' | 'draggable'> {
  count?: number;
}

export const InfoTagsSkeleton = ({
  compact,
  count = 3,
  draggable,
}: SkeletonProps) => {
  const content = (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <InfoTagSkeleton key={i} compact={compact} />
      ))}
    </>
  );

  if (draggable) {
    return (
      <DraggableWrapper className={WRAPPER_CLASSNAME}>
        {content}
      </DraggableWrapper>
    );
  }

  return <div className={cn(WRAPPER_CLASSNAME, 'flex-wrap')}>{content}</div>;
};
