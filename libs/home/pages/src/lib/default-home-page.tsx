import 'animate.css/animate.min.css';
import Script from 'next/script';

import {
  LandingBalls,
  LandingFooter,
  LandingMetadata,
  LandingScripts,
  LandingSections,
} from '@jobstash/home/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';
import next from 'next';

export const DefaultHomePage = () => (
  <>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />
    
    <PageWrapper>
      <Script src="https://xemantic.github.io/shader-web-background/dist/shader-web-background.min.js" />
      <Script type="x-shader/x-fragment" id="image" src='./shader.js' />
      <Script type='text/javascript' src="./init-shader.js" />
     
      <SideBar />
      <div className="px-6 md:px-10">
        <LandingSections />
        <LandingFooter />
      </div>
    </PageWrapper>
  </>
);
