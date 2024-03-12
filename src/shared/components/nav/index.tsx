import { Brand } from '~/shared/components/brand';
import { MobileHeader } from '~/shared/components/mobile-header';

import { NavContent } from './content';
import { DisplayWrapper } from './display-wrapper';

interface Props {
  connectWalletButton: React.ReactNode;
}

export const Nav = ({ connectWalletButton }: Props) => {
  return (
    <nav>
      {/* Mobile Top Header */}
      <MobileHeader left={<Brand />} />

      {/* Mobile Fullscreen Nav */}
      <DisplayWrapper>
        <div className="fixed left-0 top-0 z-50 flex size-full shrink-0 flex-col bg-gradient-to-l from-[#8743FF] to-[#4136F1] p-4 py-2 md:hidden">
          <NavContent isMobile connectWalletButton={connectWalletButton} />
        </div>
      </DisplayWrapper>

      {/* Desktop Sidebar Nav */}
      <div className="fixed left-0 top-0 hidden size-full max-w-fit shrink-0 flex-col border-r-2 border-white/5 p-4 md:flex">
        <NavContent connectWalletButton={connectWalletButton} />
      </div>
    </nav>
  );
};
