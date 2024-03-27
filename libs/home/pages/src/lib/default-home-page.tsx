import 'animate.css/animate.min.css';
import Head from 'next/head';
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
    <Head>
      <Script src="https://xemantic.github.io/shader-web-background/dist/shader-web-background.min.js" />
      <Script
        type="x-shader/x-fragment"
        id="image"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
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
            `,
        }}
      />
      <Script
        id="image"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          shaderWebBackground.shade({
            shaders: {
              image: {
                uniforms: {
                  iTime: (gl, loc) => gl.uniform1f(loc, performance.now() / 1000)
                }
              }
            }
          });
            `,
        }}
      />
    
    </Head>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />

    <PageWrapper>
      <div id="shader-web-background"></div> 

      <SideBar />
      <div className="px-6 md:px-10">
        
        <LandingSections />
        <LandingFooter />
      </div>
    </PageWrapper>
  </>
);
