import { NotFoundPage } from '@jobstash/shared/pages';

export const TalentsPage = () => <NotFoundPage />;

//
// const { role, flow, isLoading: isLoadingAuth } = useAuthContext();

// const { data: rowData, isPending } = useDevTalents();

// const isLoading = isLoadingAuth || isPending;

// if (isLoading) return <LoadingPage />;

// if (
//   role !== CHECK_WALLET_ROLES.ORG ||
//   flow !== CHECK_WALLET_FLOWS.ORG_COMPLETE
// ) {
//   return <NotFoundPage />;
// }

// return (
//   <>
//     <Head>
//       <title>Available Talents</title>
//     </Head>
//     <OrgProfileInfoProvider>
//       <PageWrapper>
//         <SideBar />
//         <TalentTabs />
//         <DevTalentsTable rowData={rowData} />
//         <NoteUpdatePayloadSyncer />
//       </PageWrapper>
//     </OrgProfileInfoProvider>
//   </>
// );
