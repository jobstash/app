import { NotFoundPage } from '@jobstash/shared/pages';
export const CandidateReportPage = () => <NotFoundPage />;

//
// const { isLoading, role, flow } = useAuthContext();

// if (isLoading) return <LoadingPage />;

// const isOrg = role === CHECK_WALLET_ROLES.ORG;
// const isComplete = flow === CHECK_WALLET_FLOWS.ORG_COMPLETE;

// if (!isOrg || !isComplete) {
//   return <NotFoundPage />;
// }

// return (
//   <>
//     <Head>
//       <title>Candidate Report</title>
//     </Head>

//     <PageWrapper>
//       <SideBar />
//       <CandidateReportForm />
//     </PageWrapper>
//   </>
// );
