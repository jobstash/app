import { GetServerSideProps } from 'next';

export { JobFoldersPage as default } from '@jobstash/jobs/pages';

export const getServerSideProps: GetServerSideProps<{
  slug: string;
}> = async (context) => {
  const { slug } = context.params as { slug: string };

  if (!slug) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
    },
  };
};
