import { Skeleton } from '@heroui/skeleton';

import { cn } from '@jobstash/shared/utils';

import { BartabSkeleton, IsMountedWrapper, Text } from '@jobstash/shared/ui';

import SidebarBartab, { SidebarBartabProps } from './sidebar-bartab';

interface ContentProps {
  title: string;
  isMobile?: boolean;
  children: React.ReactNode;
}

const Content = ({ children, title, isMobile }: ContentProps) => {
  const wrapperClassName = cn('space-y-2 pt-3', {
    'flex flex-col justify-start items-start [&>*]:bg-transparent [&>*]:bg-none [&>*]:hover:bg-transparent':
      isMobile,
  });

  return (
    <div className="flex flex-col">
      <Text color="dimmed">{title}</Text>
      <div className={wrapperClassName}>{children}</div>
    </div>
  );
};

interface Props extends Omit<ContentProps, 'children'> {
  bartabs: SidebarBartabProps[];
  isMountedWrapped?: boolean;
}

export const SidebarSection = ({
  bartabs,
  isMountedWrapped,
  ...innerProps
}: Props) => {
  if (bartabs.length === 0) return null;

  const content = (
    <Content {...innerProps}>
      {bartabs.map((props) => (
        <SidebarBartab key={props.path} {...props} />
      ))}
    </Content>
  );

  if (isMountedWrapped) {
    return <IsMountedWrapper>{content}</IsMountedWrapper>;
  }

  return content;
};

export const SidebarSectionSkeleton = () => (
  <div className="flex flex-col gap-1">
    <Skeleton className="h-4 w-24 rounded-md" />
    <div className="space-y-2 pt-3">
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BartabSkeleton key={index} />
      ))}
    </div>
  </div>
);
