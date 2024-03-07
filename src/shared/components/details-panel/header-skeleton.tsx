import { InfoTagsSkeleton } from '~/shared/components/info-tags';
import { LogoTitleSkeleton } from '~/shared/components/logo-title';
import { ParagraphSkeleton } from '~/shared/components/paragraph-skeleton';

export const DetailsPanelHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <LogoTitleSkeleton />
      <InfoTagsSkeleton />
      <ParagraphSkeleton />
      <InfoTagsSkeleton count={4} />
    </div>
  );
};
