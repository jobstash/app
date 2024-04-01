/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

import { FRONTEND_URL } from '@jobstash/shared/core';
import { lato } from '@jobstash/shared/core';

import { ExploreJobsButton } from '@jobstash/home/ui';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';

export const LobsterDAOHomePage = () => {
  useEffect(
    () =>
      // Return a cleanup function that will be called on component unmount.
      () => {
        // This is the cleanup function.
        const canvasElement = document.querySelector('#shader-web-background');
        if (canvasElement) {
          // Remove the canvas element from the DOM.
          canvasElement.remove();
        }

        // Here, you can also include any additional cleanup logic you might need,
        // such as stopping animations or deallocating resources used by your WebGL context.
      },
    [],
  ); // The empty dependency array means this effect runs once on mount and once on unmount.

  // Component JSX
  return (
    <>
      <Head>
        <title>LobsterDAO | JobStash</title>
        <script
          type="text/javascript"
          src="https://xemantic.github.io/shader-web-background/src/main/js/shader-web-background-api.js"
        />
        <script
          type="text/javascript"
          src="https://xemantic.github.io/shader-web-background/src/main/js/webgl-utils.js"
        />
        <script
          type="text/javascript"
          src="https://xemantic.github.io/shader-web-background/src/main/js/shader-web-background.js"
        />
        <script type="text/javascript">
          {`
          const ONE_IN_3D = [1, 1, 1];
          const c1 = [3.54585104, 2.93225262, 2.41593945];
          const x1 = [0.69549072, 0.49228336, 0.27699880];
          const y1 = [0.02312639, 0.15225084, 0.52607955];
          const c2 = [3.90307140, 3.21182957, 3.96587128];
          const x2 = [0.11748627, 0.86755042, 0.66077860];
          const y2 = [0.84897130, 0.88445281, 0.73949448];
          const saturate = (x) => Math.min(Math.max(x, 0), 1);
          const to3d = (x) => [x, x, x];
          const add3d = (x, y) => [x[0] + y[0], x[1] + y[1], x[2] + y[2]];
          const subtract3d = (x, y) => [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
          const multiply3d = (x, y) => [x[0] * y[0], x[1] * y[1], x[2] * y[2]];
          const pow23d = (x) => multiply3d(x, x);
          const saturate3d = (x) => [saturate(x[0]), saturate(x[1]), saturate(x[2])];
          const bump3y = (x, yoffset) => saturate3d(subtract3d(subtract3d(ONE_IN_3D, pow23d(x)), yoffset));
          const spectral_zucconi6 = (x) => add3d(bump3y(multiply3d(c1, subtract3d(to3d(x), x1)), y1), bump3y(multiply3d(c2, subtract3d(to3d(x), x2)), y2));
        `}
        </script>

        <script type="x-shader/x-fragment" id="feedback">
          {`
          precision highp float;

          uniform vec2      iResolution;
          uniform float     iMinDimension;
          uniform sampler2D iChannel0;
          uniform vec2      iScreenRatioHalf;
          uniform vec2      iFeedbackZoomCenter;
          uniform float     iFeedbackZoomRate;
          uniform vec2      iFeedbackShiftVector;
          uniform float     iFeedbackFadeRate;
          uniform float     iFeedbackColorShiftZoom;
          uniform float     iFeedbackColorShiftImpact;
          uniform vec2      iDrawCenter;
          uniform float     iDrawIntensity;
          uniform float     iBlobEdgeSmoothing;
          uniform float     iBlob1Radius;
          uniform float     iBlob1PowFactor;
          uniform vec3      iBlob1Color;
          uniform float     iBlob2Radius;
          uniform float     iBlob2PowFactor;
          uniform vec3      iBlob2Color;
          uniform float     iColorShiftOfRadius;

          /*
            Normally it would be provided by texture parameters, but on iOS the texture REPEAT works only
            for textures which size is the power of 2.
          */
          vec4 repeatedTexture(in sampler2D channel, in vec2 uv) {
            return texture2D(channel, mod(uv, 1.));
          }

          float drawBlob(
            in vec2 st,
            in vec2 center,
            in float radius,
            in float edgeSmoothing
          ) {
            float dist = length((st - center) / radius);
            return dist * smoothstep(1., 1. - iBlobEdgeSmoothing, dist);
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / iResolution;
            vec2 st = (gl_FragCoord.xy * 2. - iResolution) / iMinDimension;

            float drawDist = length(st - iDrawCenter);

            vec3 colorShift = repeatedTexture(
              iChannel0,
              uv - st * iFeedbackColorShiftZoom * iScreenRatioHalf
            ).rgb;

            vec2 stShift = vec2(0);
            stShift += iFeedbackZoomRate * (st - iFeedbackZoomCenter);
            stShift += (colorShift.rg - .5) * iFeedbackColorShiftImpact;
            stShift += iFeedbackShiftVector;
            stShift *= iScreenRatioHalf;

            vec3 prevColor = repeatedTexture(iChannel0, uv - stShift).rgb;
            prevColor *= iFeedbackFadeRate;

            vec3 drawColor = vec3(0);

            float radius =
              1.
              + (colorShift.r + colorShift.g + colorShift.b) * iColorShiftOfRadius;
            drawColor +=
              pow(
                drawBlob(st, iDrawCenter, radius * iBlob1Radius, iBlobEdgeSmoothing),
                iBlob1PowFactor
              ) * iBlob1Color;
            drawColor +=
              pow(
                drawBlob(st, iDrawCenter, radius * iBlob2Radius, iBlobEdgeSmoothing),
                iBlob2PowFactor
              ) * iBlob2Color;

            vec3 color = vec3(0);
            drawColor *= iDrawIntensity;
            prevColor *= iFeedbackFadeRate;
            color += prevColor;
            color += drawColor;

            color = clamp(color, 0., 1.);
            gl_FragColor = vec4(color, 1.);
          }
          `}
        </script>

        <script type="x-shader/x-fragment" id="image">
          {`
					precision highp float;

          uniform vec2 iResolution;
          uniform sampler2D iChannel0;

          void main(){
            gl_FragColor = texture2D(iChannel0, gl_FragCoord.xy / iResolution);
          }
				`}
        </script>

        <script type="text/javascript" src={`${FRONTEND_URL}/init-shader.js`} />
      </Head>
      <PageWrapper>
        <SideBar />

        <div className="pt-[100px] w-full flex items-center justify-center px-6 md:px-10">
          <div className="flex flex-col gap-16 items-center">
            <div className="flex flex-col items-center md:gap-20 md:flex-row ">
              <Image
                width={360}
                height={132}
                alt="LobsterDAO"
                src="/lobsterdao-community.png"
                className="w-[150px] mb-4 md:w-auto md:mb-0 md:h-[182px]"
              />
              <span className="text-4xl font-bold">X</span>
              <Image
                width={384}
                height={106}
                alt="JobStash"
                src="/jobstash-community.png"
                className="w-[250px] md:w-[350px]"
              />
            </div>
            <div
              className={`${lato.className} font-semibold text-3xl text-white text-center`}
            >
              <p>
                <span className="text-white/50 mr-2">Hello Seafood</span>
                <br />
                Jobs at orgs with other aquatic creatures
                <br />
                Apply directly, or reach out on Telegram!
              </p>
            </div>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <ExploreJobsButton />
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
