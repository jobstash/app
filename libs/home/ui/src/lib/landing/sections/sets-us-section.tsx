import { memo } from 'react';

import { lato } from '@jobstash/shared/core';

const SetsUsSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <svg
      className="h-[94px] my-10 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 101"
    >
      <path
        fill="#fff"
        fillOpacity=".1"
        d="M.667 95a5.333 5.333 0 1 1 10.666 0A5.333 5.333 0 0 1 .667 95ZM6 1V0h1v1H6ZM5 95V1h2v94H5ZM5 0h1v2H5V0Z"
      />
    </svg>
    <div>
      <h3
        className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center`}
      >
        What Sets us Apart
      </h3>
      <div className="flex flex-wrap flex-row mt-6 -mx-2">
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Safety by Default
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              At JobStash we don&#39;t let random anons post jobs. Other Job
              Platforms allow to &#34;post jobs&#34; for payment, but we believe
              this creates perverse incentives. In contrast, we pull jobs from
              career pages of verified crypto organizations on a daily basis,
              and only include reputable companies in our index. This way you
              know you will never be sent to a fake recruiter and risk having
              your safety compromised.
            </p>
            {/* <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div> */}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Accurate data where it matters
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              We built Jobstash from the ground up leveraging AI to Structure
              Data so that jobposts can be presented in a concise, uniform and
              filterable way. We are able to present you datapoints about jobs
              that other platforms do not extract, and combine the information
              we have about jobs with data from DefiLlama and from De.Fi to give
              you a sense of the financials and safety of a protocol.
            </p>
            {/* <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div> */}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              Shining Light on Great Applicants
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              In todays market condition successful job posts get hundreds if
              not thousands of job applicants, with a very low S/N ratio. We
              understand that crypto is different than other industries. High
              performance teams are built on trust, and we embrace this natively
              by surfacing applicants that are currently working in the industry
              or that are crypto adjacent, so that when you interview with
              JobStash, you know the person you&#39;re talking to is the real
              deal. Great talent has the best chance of being hired using
              JobStash.
            </p>
            {/* <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div> */}
          </div>
        </div>
        <div className="w-full md:w-2/3 px-2 mb-4">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              No Middlemen
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              JobStash does not include jobs from agencies. We directly connect
              talent with the hiring managers, and provide data and ease of
              access to facilitate great talent introductions. We actively
              encourage people to introduce themselves via their trusted
              personal network, as we believe that crypto teams are built on
              reputation and trust.
            </p>
            {/* <div className="mt-6 aspect-w-16 aspect-h-3">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div> */}
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <div className="bg-white bg-opacity-5 p-5 rounded-3xl">
            <h3
              className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
            >
              We take the hard road
            </h3>
            <p className="text-md text-white/75 text-left pb-">
              At JobStash we&#39;ve spent the past years obsessing over how to
              build an amazing experience for talent specifically in crypto. We
              have done crazy things, such as built data pipelines that consume
              literal years of compute time to import all of crypto GitHub, just
              to be able to detect if a user is actually part of an
              organization, as he may claim. See, in crypto you can&#39;t trust
              anybody. We take the same approach. We verify every single bit of
              data, and strive for accuracy and completeness. We don&#39;t
              simply operate as a job board. We are an intelligence hub for
              people operations in crypto, and base this on a foundation of
              rigorous data verification, comprehensive analytics, and deep
              insights into the Web3 talent landscape.
            </p>
            {/* <div className="mt-6 aspect-w-16 aspect-h-6">
              <Image
                fill
                alt="placeholder"
                className="object-center object-cover"
                src="https://placehold.co/600x400/EEE/31343C/png"
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default memo(SetsUsSection);
