import { InternalErrorResult, Loader } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

interface Props {
  isError: boolean;
}

export const MagicLinkPage = ({ isError }: Props) => (
  <div className="w-full lg:pl-52">
    <SideBar />

    <div className="flex h-screen items-center justify-center pl-4">
      {isError ? <InternalErrorResult /> : <Loader />}
    </div>
  </div>
);
