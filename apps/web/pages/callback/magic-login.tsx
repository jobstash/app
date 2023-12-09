import { LoadingPage } from '@jobstash/shared/pages';

import { useSendMagicLink } from '@jobstash/auth/state';

const MagicLoginCallbackPage = () => {
  const tokenParam = new URLSearchParams(window.location.search).get('token');

  const { data, isLoading } = useSendMagicLink(tokenParam);

  if (isLoading || !data) return <LoadingPage />;

  return <pre>{JSON.stringify({ tokenParam, data }, undefined, '\t')}</pre>;
};

export default MagicLoginCallbackPage;
