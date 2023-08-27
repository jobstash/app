import { LoadingOverlay } from '@mantine/core';

import { useBlockedTermsContext } from '@jobstash/admin/state';

import { Loader } from '@jobstash/shared/ui';

interface Props {
  canRender: boolean;
  children: React.ReactNode;
}

const BlockedTermsContentWrapper = ({ canRender, children }: Props) => {
  const { isLoading } = useBlockedTermsContext();

  if (!canRender) return <Loader />;

  return (
    <div className="flex flex-col p-12 pb-8 border border-gray rounded-lg w-1/2 gap-8 relative">
      <LoadingOverlay visible={isLoading} />
      {children}
      {/* <BlockedTermsInfo /> */}
    </div>
  );
};

export default BlockedTermsContentWrapper;
