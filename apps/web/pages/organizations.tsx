import Head from 'next/head';
import { lato } from '@jobstash/shared/core';
import { Button } from '@nextui-org/button';
import { PageWrapper } from '@jobstash/shared/ui';
import { SideBar } from '@jobstash/sidebar/feature';
import { StatsGrid } from '@jobstash/shared/ui';

const OrganizationsPage = () => (
  <>
    <Head>
      <title>JobStash | Organizations</title>
    </Head>
    <PageWrapper>
      <SideBar />
      <div className="px-6 mt-16 md:px-10">
        <h3
          className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6`}
        >
          Our Stats
        </h3>
        <div className="max-w-6xl pb-8 mx-auto">
          <StatsGrid />
        </div>
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
        <h3
          className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6`}
        >
          Organisations
        </h3>
        <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          dignissim porta scelerisque. Praesent venenatis nisi quam, a malesuada
          nunc scelerisque at. Curabitur imperdiet nibh sapien, a tempus est
          pretium et. Nam quam est, suscipit eu magna vestibulum, rutrum viverra
          odio. Curabitur at ipsum at odio dignissim pellentesque vel eu ante.
          Nullam et lacus et erat rutrum blandit. Pellentesque id massa vel
          purus gravida ultricies. Fusce urna dolor, consequat ac accumsan eget,
          laoreet id metus. Nam sodales est a ex tempor, ac aliquet nunc
          porttitor. Vivamus a maximus purus. Praesent sed diam ultrices nibh
          suscipit elementum vitae eget magna.
        </p>
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
            <div className="flex flex-row flex-wrap mt-6 -mx-2">
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
                  >
                    Safety by Default
                  </h3>
                  <p className="text-left text-md text-white/75 pb-">
                    At JobStash we don&#39;t let random anons post jobs. Other
                    Job Platforms allow to &#34;post jobs&#34; for payment, but
                    we believe this creates perverse incentives. In contrast, we
                    pull jobs from career pages of verified crypto organizations
                    on a daily basis, and only include reputable companies in
                    our index. This way you know you will never be sent to a
                    fake recruiter and risk having your safety compromised.
                  </p>
                  <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                    Explore Job
                  </Button>
                </div>
              </div>
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-xl pb-3 font-bold text-white`}
                  >
                    Accurate data where it matters
                  </h3>
                  <p className="text-left text-md text-white/75 pb-">
                    We built Jobstash from the ground up leveraging AI to
                    Structure Data so that jobposts can be presented in a
                    concise, uniform and filterable way. We are able to present
                    you datapoints about jobs that other platforms do not
                    extract, and combine the information we have about jobs with
                    data from DefiLlama and from De.Fi to give you a sense of
                    the financials and safety of a protocol.
                  </p>
                  <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                    Explore Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
        <h3
          className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6`}
        >
          This will be changed
        </h3>
        <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          dignissim porta scelerisque. Praesent venenatis nisi quam, a malesuada
          nunc scelerisque at. Curabitur imperdiet nibh sapien, a tempus est
          pretium et. Nam quam est, suscipit eu magna vestibulum, rutrum viverra
          odio. Curabitur at ipsum at odio dignissim pellentesque vel eu ante.
          Nullam et lacus et erat rutrum blandit. Pellentesque id massa vel
          purus gravida ultricies. Fusce urna dolor, consequat ac accumsan eget,
          laoreet id metus. Nam sodales est a ex tempor, ac aliquet nunc
          porttitor. Vivamus a maximus purus. Praesent sed diam ultrices nibh
          suscipit elementum vitae eget magna.
        </p>
        <section className="relative mx-auto lg:max-w-6xl">
          <div className="flex flex-row flex-wrap my-16 -mx-2 space-y-6 md:justify-center md:space-y-0">
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 pb-">
                  JobStash does not include jobs from agencies. We directly
                  connect talent with the hiring managers, and provide data and
                  ease of access to facilitate great talent introductions. We
                  actively encourage people to introduce themselves via their
                  trusted personal network, as we believe that crypto teams are
                  built on reputation and trust.
                </p>
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Explore Job
                </Button>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 pb-">
                  JobStash does not include jobs from agencies. We directly
                  connect talent with the hiring managers, and provide data and
                  ease of access to facilitate great talent introductions. We
                  actively encourage people to introduce themselves via their
                  trusted personal network, as we believe that crypto teams are
                  built on reputation and trust.
                </p>
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Explore Job
                </Button>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 pb-">
                  JobStash does not include jobs from agencies. We directly
                  connect talent with the hiring managers, and provide data and
                  ease of access to facilitate great talent introductions. We
                  actively encourage people to introduce themselves via their
                  trusted personal network, as we believe that crypto teams are
                  built on reputation and trust.
                </p>
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Explore Job
                </Button>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 pb-">
                  JobStash does not include jobs from agencies. We directly
                  connect talent with the hiring managers, and provide data and
                  ease of access to facilitate great talent introductions. We
                  actively encourage people to introduce themselves via their
                  trusted personal network, as we believe that crypto teams are
                  built on reputation and trust.
                </p>
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Explore Job
                </Button>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 pb-">
                  JobStash does not include jobs from agencies. We directly
                  connect talent with the hiring managers, and provide data and
                  ease of access to facilitate great talent introductions. We
                  actively encourage people to introduce themselves via their
                  trusted personal network, as we believe that crypto teams are
                  built on reputation and trust.
                </p>
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Explore Job
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  </>
);

export default OrganizationsPage;
