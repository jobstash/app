import { GetServerSideProps } from 'next';

export { JobFoldersPage as default } from '@jobstash/jobs/pages';

export const getServerSideProps: GetServerSideProps<{
  id: string;
}> = async (context) => {
  const { id } = context.params as { id: string };

  if (!id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
  };
};
