import { type ReactNode } from 'react';

import {
  useBlockedTermsFormContext,
  useTagsContext,
} from '@jobstash/admin/state';

import AdminContentLoader from '../../admin-content-loader';
import AdminTechContentWrapper from '../../admin-tech-content-wrapper';

interface Props {
  children: ReactNode;
}

const BlockedTermsContentWrapper = ({ children }: Props) => {
  const { isLoading: isLoadingTags } = useTagsContext();

  const { isLoadingQuery } = useBlockedTermsFormContext();

  const isLoadingPage = isLoadingTags || isLoadingQuery;

  if (isLoadingPage) return <AdminContentLoader />;

  return <AdminTechContentWrapper>{children}</AdminTechContentWrapper>;
};

export default BlockedTermsContentWrapper;
