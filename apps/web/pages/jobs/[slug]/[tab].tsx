import { GetServerSideProps } from 'next';

import { type JobPostPageProps } from '@jobstash/jobs/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { withCSR } from '@jobstash/shared/utils';

import { getJobPost } from '@jobstash/jobs/data';

export const getServerSideProps: GetServerSideProps<JobPostPageProps> = withCSR(
  async (ctx) => {
    const shortUuid = ctx.query.slug?.slice(-6) as string | undefined;
    if (typeof shortUuid !== 'string') return { notFound: true };

    const initJob = await getJobPost(shortUuid);

    const queryClient = new QueryClient();
    queryClient.setQueryData(['job-post', shortUuid], initJob);

    const dehydratedState = dehydrate(queryClient);

    return {
      props: {
        dehydratedState,
        initJob,
        fromSSR: true,
      },
    };
  },
  { props: { initJob: null, fromSSR: false } },
);

export { JobPostPage as default } from '@jobstash/jobs/pages';
