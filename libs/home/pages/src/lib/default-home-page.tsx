/* eslint-disable @next/next/no-sync-scripts */
import 'animate.css/animate.min.css';
import Script from 'next/script';
import Head from 'next/head';
import { FRONTEND_URL } from '@jobstash/shared/core';
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
    <Head>
      <script src="https://xemantic.github.io/shader-web-background/dist/shader-web-background.min.js" />
      {/* <script
        type="x-shader/x-fragment"
        id="image"
        src={`${FRONTEND_URL}/shader.frag`}
      /> */}
      <script type="x-shader/x-fragment" id="image">{`
					precision highp float;

					uniform float iTime;

					void main() {
					gl_FragColor = vec4(
							mod(gl_FragCoord.x / 256., 1.),
							mod((gl_FragCoord.x + gl_FragCoord.y - iTime * 40.) / 256. , 1.),
							mod(gl_FragCoord.y / 256., 1.),
							1.
					);
					}
				`}
      </script>
      <script src={`${FRONTEND_URL}/init-shader.js`} />

    </Head>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />
    
    <PageWrapper>
      {/* <Script src="https://xemantic.github.io/shader-web-background/dist/shader-web-background.min.js" />
      <Script type='text/javascript' src='/shader.js' />
      <Script type='text/javascript' src="/init-shader.js" /> */}
     <div id="canvas"></div>
      <SideBar />
      <div className="px-6 md:px-10">
        <LandingSections />
        <LandingFooter />
      </div>
    </PageWrapper>
  </>
);
