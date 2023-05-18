import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { dehydrate, QueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import NProgress from 'nprogress';

import { Filters } from '~/features/filters/components';
import { getFilterFromQuery } from '~/features/filters/utils';
import { activeJobAtom } from '~/features/jobs/atoms';
import JobList from '~/features/jobs/components/job-list';
import { JobListResult } from '~/features/jobs/core/types';
import { fetchJobList } from '~/features/jobs/fetch';
import { useJobListingInfQuery } from '~/features/jobs/hooks';
import { useJobQuery } from '~/features/jobs/hooks/use-job-query';
import { JobRightPanel } from '~/features/right-panel/components';
import { SideBar } from '~/features/sidebar/components';
import { MetaData } from '~/shared/components';
import {
  ERR_INTERNAL,
  NEXT_PUBLIC_FRONTEND_URL,
} from '~/shared/core/constants';
import { withCSR } from '~/shared/hocs';
import { sentryMessage } from '~/shared/utils';

interface Props {
  data: {
    //
    initJob: JobListResult | null;
    fromSSR?: boolean;
  };
}

const JobsPage = ({ data: { initJob, fromSSR } }: Props) => {
  // SentryMessage('JobsPage initJob', JSON.stringify(initJob));
  // sentryMessage('JobsPage fromSSR', JSON.stringify(fromSSR));

  const [activeJob, setActiveJob] = useAtom(activeJobAtom);
  const initRef = useRef(false);

  const router = useRouter();
  const shortUuid = (router.query.key?.slice(-6) as string) ?? '';
  // SentryMessage('JobsPage shortUuid', JSON.stringify(shortUuid));

  const { data: jobListResult } = useJobQuery(
    shortUuid,
    Boolean(shortUuid),
    (data) => setActiveJob(data),
  );

  useEffect(() => {
    // Prevent scroll restore when directly accessed from address-bar
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = fromSSR ? 'manual' : 'auto';
    }

    // Complete nProgress when routed from /jobs
    if (!fromSSR) {
      NProgress.done();
    }
  }, [fromSSR]);

  // Sync SSR data active post
  useEffect(() => {
    if (!initRef.current && !initJob && jobListResult) {
      initRef.current = true;
      setActiveJob(jobListResult);
      // SentryMessage('JobsPage useEffect setActiveJob', JSON.stringify(jobListResult));
    }
  }, [initJob, jobListResult, setActiveJob]);

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    filterParamsObj,
  } = useJobListingInfQuery();

  const getJsonLd = () => {
    if (jobListResult) {
      const {
        organization,
        technologies,
        role,
        team,
        culture,
        jobTitle,
        jobCreatedTimestamp,
        jobApplyPageUrl,
        jobPageUrl,
        jobCommitment,
        jobLocation,
        minSalaryRange,
        maxSalaryRange,
        benefits,
      } = jobListResult;
      const imageLink = `https://www.google.com/s2/favicons?domain=${organization.url}&sz=128`;

      let description = `<p>Role</p>\n\n<p>${role}</p>\n\n`;
      if (team) {
        description += `<p>Team</p>\n\n<p>${team}</p>\n\n`;
      }

      if (culture) {
        description += `<p>Culture</p>\n\n<p>${culture}</p>\n\n`;
      }

      if (technologies.length > 0) {
        description += '<p>Technologies:</p>\n\n<ul>';
        for (const tech of technologies.map((t) => t.name)) {
          description += `<li>${tech}</li>`;
        }

        description += '</ul>\n\n';
      }

      const jsonLd: Record<
        string,
        | string
        | number
        | boolean
        | Record<string, string | number | Record<string, string | number>>
      > = {
        '@context': 'https://schema.org/',
        '@type': 'JobPosting',
        title: jobTitle,
        description,
        datePosted: new Date(jobCreatedTimestamp).toISOString(),
        hiringOrganization: {
          '@type': 'Organization',
          name: organization.name,
          logo: imageLink,
          sameAs: organization.url,
        },
        image: imageLink,
        directApply: Boolean(jobApplyPageUrl) || Boolean(jobPageUrl),
        employerOverview: organization.description,
        employmentType: jobCommitment
          ? jobCommitment.toUpperCase()
          : 'FULL_TIME',
      };

      if (role) {
        jsonLd['responsibilities'] = role;
      }

      if (jobLocation) {
        const isRemote = jobLocation.toLowerCase().includes('remote');
        if (isRemote) {
          jsonLd['jobLocationType'] = 'TELECOMMUTE';
        }

        const locationName = jobLocation
          .replaceAll(/remote/gi, '')
          .replaceAll('-', '')
          .replaceAll('or', '')
          .trim();

        jsonLd['applicantLocationRequirements'] = {
          '@type': 'Country',
          name: locationName,
        };

        jsonLd['jobLocation'] = {
          '@type': 'Place',
          address: {
            name: locationName,
          },
        };
      }

      if (minSalaryRange && maxSalaryRange) {
        jsonLd['baseSalary'] = {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: {
            '@type': 'QuantitativeValue',
            minValue: minSalaryRange,
            maxValue: maxSalaryRange,
            unitText: 'YEAR',
          },
        };
      }

      if (benefits) {
        jsonLd['jobBenefits'] = benefits;
      }

      if (technologies.length > 0) {
        jsonLd['skills'] = technologies.map((t) => t.name).join(', ');
      }

      return {
        __html: JSON.stringify(jsonLd),
      };
    }

    return {
      __html: '',
    };
  };

  const titleMetaData = `${jobListResult?.jobTitle} | ${jobListResult?.organization.name}`;
  const urlMetaData = `${NEXT_PUBLIC_FRONTEND_URL}${router.asPath.slice(
    0,
    router.asPath.lastIndexOf('/'),
  )}/details`;

  return (
    <>
      {jobListResult && (
        <MetaData
          title={titleMetaData}
          description={
            jobListResult.role ??
            jobListResult.benefits ??
            jobListResult.team ??
            jobListResult.jobTitle
          }
          url={urlMetaData}
          image={`${NEXT_PUBLIC_FRONTEND_URL}/JobStash-Wordmark-800.png`}
          twitter={{
            site: '@jobstash_xyz',
            image: `${NEXT_PUBLIC_FRONTEND_URL}/JobStash.svg`,
          }}
          jsonLd={getJsonLd()}
        />
      )}

      <div className="w-full lg:pl-52 lg:pr-[41.67%]">
        <SideBar />

        <div className="px-3.5 pt-[65px] lg:px-8 lg:pt-0">
          <Filters jobCount={data?.pages[0].total} />
          <JobList
            initJob={initJob}
            activeJob={activeJob ?? initJob}
            data={data}
            fetchNextPage={fetchNextPage}
            filterParamsObj={filterParamsObj}
            isLoading={isLoading}
            error={error}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
        <div
          className={clsx(
            'lg:hide-scrollbar fixed inset-0 z-50 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
            { active: activeJob === initJob },
          )}
        >
          <JobRightPanel jobListResult={jobListResult} />
        </div>
      </div>
    </>
  );
};

export default JobsPage;

export const getServerSideProps: GetServerSideProps<Props> = withCSR(
  async (ctx) => {
    const mwURL = process.env['NEXT_PUBLIC_MW_URL'];
    if (!mwURL) {
      sentryMessage('/jobs/{shortUuid} Missing env', 'NEXT_PUBLIC_MW_URL');
      throw new Error(ERR_INTERNAL);
    }

    const shortUuid = ctx.query.key?.slice(-6) as string;
    if (!shortUuid) return { notFound: true };
    // SentryMessage('getServerSideProps shortUuid', shortUuid);

    const initJob = await fetch(`${mwURL}/jobs/details/${shortUuid}`).then(
      (r) => {
        if (!r.ok) {
          sentryMessage('/jobs/{shortUuid} fetch job-post', '!res.ok');
          throw new Error(ERR_INTERNAL);
        }

        return r.json();
      },
    );
    // SentryMessage('getServerSideProps initJob', JSON.stringify(initJob));

    const queryClient = new QueryClient();

    const { filterParamsObj } = getFilterFromQuery(ctx.query);
    await queryClient.fetchInfiniteQuery({
      queryKey: ['job-posts', filterParamsObj],
      queryFn: async ({ pageParam, queryKey }) =>
        fetchJobList({ pageParam, queryKey }),
    });

    // Cache individual item from the list
    const initDehydratedState = dehydrate(queryClient);
    const jobListResults = (initDehydratedState.queries[0].state.data as any)
      .pages[0].data as JobListResult[];
    let jobInList = false;
    if (jobListResults.length > 0) {
      for (const job of jobListResults) {
        const jobUuid = job.shortUUID;
        queryClient.setQueryData(['job-post', jobUuid], job);

        if (jobUuid === shortUuid) {
          jobInList = true;
        }
      }
    }

    // SentryMessage('getServerSideProps jobListResults', JSON.stringify(jobListResults));
    // sentryMessage('getServerSideProps jobInList', JSON.stringify(jobInList));

    if (!jobInList) {
      queryClient.setQueryData(['job-post', initJob.shortUUID], initJob);
    }

    // Dehydrate again to include setup'd cached data
    const dehydratedState = dehydrate(queryClient);
    (dehydratedState.queries[0].state.data as any).pageParams = [null];
    // SentryMessage(
    //   'getServerSideProps dehydratedState-jobList',
    //   JSON.stringify(
    //     (dehydratedState.queries[0].state.data as any).pages[0].data as Job[],
    //   ),
    // );

    return {
      props: {
        dehydratedState,
        data: {
          initJob,
          fromSSR: true,
        },
      },
    };
  },
  { props: { data: { initJob: null, fromSSR: false } } },
);
