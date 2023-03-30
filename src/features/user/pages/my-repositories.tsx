import { CHECK_WALLET_ROLES } from '~/features/auth/core/constants';
import { SideBar } from '~/features/sidebar/components';

const MyRepositoriesPage = () => (
  <div className="pl-52">
    <SideBar />
    <div className="flex h-screen w-full items-center justify-center">
      <p>TODO</p>
    </div>
  </div>
);

MyRepositoriesPage.requiredRole = CHECK_WALLET_ROLES.DEV;

export default MyRepositoriesPage;
