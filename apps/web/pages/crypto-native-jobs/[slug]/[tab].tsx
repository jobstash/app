import { GetServerSideProps } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

import { JobPost, JobPostPageSharedProps } from '@jobstash/jobs/core';
import { ERR_NOT_FOUND, ROUTE_SECTION } from '@jobstash/shared/core';
import { sentryMessage, withCSR } from '@jobstash/shared/utils';

import { getJobPost } from '@jobstash/jobs/data';
import { getSSRMwVersion } from '@jobstash/shared/data';

export const getServerSideProps: GetServerSideProps<JobPostPageSharedProps> =
  withCSR(
    async (ctx) => {
      const shortUuid = ctx.query.slug?.slice(-6) as string | undefined;
      if (typeof shortUuid !== 'string') return { notFound: true };

      let initJob: JobPost | null = null;

      const ssrHost = ctx.req.headers.host;

      try {
        initJob = await getJobPost({ shortUuid, ssrHost });
      } catch (error) {
        if ((error as Error).message === ERR_NOT_FOUND) {
          return {
            props: {
              notFoundInfo: {
                link: ROUTE_SECTION.ELITE_FAST_TRACK,
                title: 'Job Not Found',
                message: "The job you tried to find doesn't exist anymore",
                buttonText: 'Back to Job List',
              },
            },
          };
        }

        sentryMessage(
          `${ROUTE_SECTION.ELITE_FAST_TRACK} SSR`,
          `failed fetching first job details ${shortUuid}`,
        );

        throw error;
      }

      const queryClient = new QueryClient();

      const mwVersion = await getSSRMwVersion(
        'job-post-page getServerSideProps',
      );

      queryClient.setQueryData([mwVersion, 'job-post', shortUuid], initJob);

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

export { CryptoNativeJobPostPage as default } from '@jobstash/jobs/pages';
