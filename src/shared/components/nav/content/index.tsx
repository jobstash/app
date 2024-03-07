import { TEST_IDS } from '~/shared/core/constants';
import { Brand } from '~/shared/components/brand';

import { Bartab } from './bartab';
import { CloseButton } from './close-button';
import { createNavSections } from './create-nav-sections';

interface Props {
  isMobile?: boolean;
  connectWalletButton: React.ReactNode;
}

export const NavContent = (props: Props) => {
  const { isMobile, connectWalletButton } = props;

  const navSections = createNavSections();

  return (
    <div className="flex h-full flex-col justify-between md:w-[180px]">
      <nav
        className="flex flex-col gap-6 md:gap-12"
        data-testid={TEST_IDS.NAV_SECTION}
      >
        <div className="flex items-center justify-between">
          <Brand />
          {isMobile && <CloseButton />}
        </div>

        {navSections.map(({ label, bartabs }) => (
          <div key={label} className="flex flex-col gap-4">
            <h2 className="text-white/75 md:pb-0 md:text-xs md:text-[#9CA3AF]">
              {label}
            </h2>
            <div className="flex flex-col gap-4 px-2 md:gap-3 md:px-0">
              {bartabs.map(({ text, icon, href }) => (
                <Bartab
                  key={text}
                  icon={icon}
                  text={text}
                  href={href}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {connectWalletButton}
    </div>
  );
};
