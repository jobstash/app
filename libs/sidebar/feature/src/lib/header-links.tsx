import { DUCK_TELEGRAM_URL, TELEGRAM_URL } from '@jobstash/shared/core';

import { HeaderLink, JoinTalentPool } from '@jobstash/sidebar/ui';
import { PrivyButton } from '@jobstash/auth/feature';

const LINKS = [
  { text: 'For Employers', link: '/employers' },
  { text: 'Subscribe On Telegram', link: TELEGRAM_URL },
  { text: 'Post Your Job', link: '/post-job' },
  { text: 'Contact Support', link: DUCK_TELEGRAM_URL },
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
      <JoinTalentPool isMobile={isMobile} />
      {LINKS.map(({ text, link }) => (
        <HeaderLink key={link} text={text} link={link} isMobile={isMobile} />
      ))}
      {!isMobile && <PrivyButton />}
    </div>
  );
};
