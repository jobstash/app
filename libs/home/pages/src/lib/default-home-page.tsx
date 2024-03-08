import 'animate.css/animate.min.css';

import {
  LandingBalls,
  LandingFooter,
  LandingMetadata,
  LandingNav,
  LandingScripts,
  LandingSections,
} from '@jobstash/home/ui';

export const DefaultHomePage = () => (
  <>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />

    <div className="px-6 md:px-10">
      <LandingNav />
      <LandingSections />
      <LandingFooter />
    </div>
  </>
);
