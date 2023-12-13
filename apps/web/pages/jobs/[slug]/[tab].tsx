import { GetServerSideProps } from 'next';

import { type JobPostPageProps } from '@jobstash/jobs/pages';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { JobPost } from '@jobstash/jobs/core';
import { ERR_NOT_FOUND } from '@jobstash/shared/core';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getJobPost } from '@jobstash/jobs/data';

export const getServerSideProps: GetServerSideProps<JobPostPageProps> = withCSR(
  async (ctx) => {
    const shortUuid = ctx.query.slug?.slice(-6) as string | undefined;
    if (typeof shortUuid !== 'string') return { notFound: true };

    let initJob: JobPost | null = null;

    try {
      initJob = await getJobPost(shortUuid);
    } catch (error) {
      if ((error as Error).message === ERR_NOT_FOUND) {
        return {
          props: {
            notFoundInfo: {
              link: '/jobs',
              title: 'Job Not Found',
              message: "The job you tried to find doesn't exist anymore",
              buttonText: 'Back to Job List',
            },
          },
        };
      }

      sentryMessage(
        '/jobs SSR',
        `failed fetching first job details ${shortUuid}`,
      );

      throw error;
    }

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
