import { MobileHeader as BaseMobileHeader } from '~/shared/components/mobile-header';

import { DetailsPanelBackButton } from './back-button';

interface Props {
  backHref: string;
}

export const MobileHeader = ({ backHref }: Props) => {
  return (
    <BaseMobileHeader
      left={<DetailsPanelBackButton href={backHref} />}
      className="z-50 bg-darkest-gray md:left-auto md:right-0 md:flex md:w-[calc((100%-220px))] lg:hidden"
    />
  );
};
