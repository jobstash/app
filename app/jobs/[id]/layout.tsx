import { JobDetailsLayout } from '~/jobs/layouts/job-details-layout';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

const Layout = ({ children, params: { id } }: Props) => {
  return <JobDetailsLayout id={id}>{children}</JobDetailsLayout>;
};

export default Layout;
