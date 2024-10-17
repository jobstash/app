import { SUPPORT_TELEGRAM_URL, TELEGRAM_URL } from '@jobstash/shared/core';

import { HeaderLink } from '@jobstash/sidebar/ui';
import { PrivyButton } from '@jobstash/auth/feature';

const LINKS = [
  { text: 'Post Jobs for Free', link: '/post-job' },
  { text: 'Employers', link: '/employers' },
  { text: 'Subscribe', link: TELEGRAM_URL, isExternal: true },
  { text: 'Help', link: SUPPORT_TELEGRAM_URL, isExternal: true },
];

const MOBILE_CLASSNAME =
  'inset-x-0 bottom-0 flex flex-col p-4 space-y-4 lg:relative lg:hidden';

const DESKTOP_CLASSNAME =
  'items-center hidden space-x-6 lg:flex lg:mr-0 lg:ml-auto lg:pr-4';

interface Props {
  isMobile?: boolean;
}

export const HeaderLinks = ({ isMobile = false }: Props) => {
  const className = isMobile ? MOBILE_CLASSNAME : DESKTOP_CLASSNAME;

  return (
    <div className={className}>
      {LINKS.map(({ text, link, isExternal }) => (
        <HeaderLink
          key={link}
          text={text}
          link={link}
          isMobile={isMobile}
          isExternal={isExternal}
        />
      ))}
      {!isMobile && <PrivyButton />}
    </div>
  );
};
