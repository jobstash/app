import { NotFoundPage } from '@jobstash/shared/pages';

export const ProfileReviewsPage = () => <NotFoundPage />;

//
// const { role, isLoading, isAuthenticated } = useAuthContext();

// if (!isAuthenticated || isLoading) return <LoadingPage />;

// if (role !== CHECK_WALLET_ROLES.DEV) {
//   return <NotFoundPage />;
// }

// return (
//   <ProfileReviewsPageProvider>
//     <Head>
//       <title>Organization Reviews</title>
//     </Head>
//     <PageWrapper>
//       <SideBar />

//       <div className="px-3.5 pt-[212px] lg:px-12 lg:pt-6 lg:pr-[calc(44vw)]   flex flex-col gap-6">
//         <ProfileHeader gotItCard={null} gotItCardKey={null} />

//         <ProfileReviewsSubHeader />
//         <ProfileReviewsGotItCard />

//         <ProfileOrgReviewList />
//       </div>
//       <ProfileOrgReviewsRightPanel />
//     </PageWrapper>
//   </ProfileReviewsPageProvider>
// );
