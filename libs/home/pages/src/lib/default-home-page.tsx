import 'animate.css/animate.min.css';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

import {
  LandingBalls,
  LandingFooter,
  LandingMetadata,
  LandingScripts,
  LandingSections,
} from '@jobstash/home/ui';

export const DefaultHomePage = () => (
  <>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />
    
      <PageWrapper>
        <SideBar />
        <div className='px-6 md:px-10'>
          <LandingSections />
          <LandingFooter />
        </div>
      </PageWrapper>
    
  </>
);
