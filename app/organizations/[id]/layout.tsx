import { OrgDetailsLayout } from '~/orgs/layouts/org-details-layout';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

const Layout = ({ children, params: { id } }: Props) => {
  return <OrgDetailsLayout id={id}>{children}</OrgDetailsLayout>;
};

export default Layout;
