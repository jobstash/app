import { MobileHeader as BaseMobileHeader } from '~/shared/components/mobile-header';

import { DetailsPanelBackButton } from './back-button';

interface Props {
  href: string;
}

export const MobileHeader = ({ href }: Props) => {
  return (
    <BaseMobileHeader
      left={<DetailsPanelBackButton href={href} />}
      className="z-50 bg-darkest-gray md:left-auto md:right-0 md:flex md:w-[calc((100%-220px))] lg:hidden"
    />
  );
};