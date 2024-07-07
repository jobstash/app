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
          Our Pricing
        </h3>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
              <div className="p-6 border-b border-default">
                <div className="flex flex-row items-center justify-between mb-2">
                  <p className="font-bold">Individual</p>
                </div>
                <h3
                  className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                >
                  $75 <span className="text-lg">/ month</span>
                </h3>
                <p className="mt-1 text-md text-subtle">
                  $0.01 per gasless transaction + 5% of gas
                </p>
              </div>
              <ul className="flex-grow p-6 space-y-2">
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Up to 3,000 active wallets</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    Onboard users with pre-built UI components
                  </span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    Email, social, and passkey login
                  </span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Gasless transactions</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">MPC-based secure wallets</span>
                </li>
              </ul>
              <div className="px-6 pb-6">
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Get an Api key
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m14.03 8.53-4.5 4.5a.751.751 0 1 1-1.062-1.062l3.22-3.218H2.5a.75.75 0 0 1 0-1.5h9.188L8.469 4.03a.751.751 0 0 1 1.063-1.063l4.5 4.5a.75.75 0 0 1-.001 1.064Z"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
              <div className="p-6 border-b border-default">
                <div className="flex flex-row items-center justify-between mb-2">
                  <p className="font-bold">Startup</p>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <svg
                      width="12"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="text-primary"
                    >
                      <g clipPath="url(#a)">
                        <path d="M14.227 10.273a5.63 5.63 0 0 1-.204 1.524 5.97 5.97 0 0 1-.57 1.367 5.39 5.39 0 0 1-.898 1.164c-.354.35-.74.646-1.157.89a5.841 5.841 0 0 1-1.367.579A5.379 5.379 0 0 1 8.5 16a5.64 5.64 0 0 1-1.523-.203 5.969 5.969 0 0 1-1.368-.57 5.39 5.39 0 0 1-1.164-.899 5.906 5.906 0 0 1-.89-1.156 5.835 5.835 0 0 1-.578-1.367 5.377 5.377 0 0 1-.204-1.532c0-.515.066-1.023.196-1.523s.336-.971.617-1.414c.11.219.227.435.352.648.124.214.268.404.43.57.16.167.348.305.562.415.213.11.455.161.726.156a1.7 1.7 0 0 0 .672-.133c.208-.088.39-.213.547-.375a1.759 1.759 0 0 0 .508-1.219c0-.203-.031-.385-.094-.546a2.409 2.409 0 0 0-.266-.493 5.776 5.776 0 0 1-.351-.562 4.836 4.836 0 0 1-.258-.555 2.48 2.48 0 0 1-.148-.594 8.361 8.361 0 0 1-.055-.671 3.976 3.976 0 0 1 .984-2.633A4.318 4.318 0 0 1 8.29.454 3.575 3.575 0 0 1 9.664 0c.078 1.115.339 2.135.781 3.063a9.686 9.686 0 0 0 1.828 2.585 7.123 7.123 0 0 1 1.454 2.118c.333.76.5 1.596.5 2.507Z"></path>
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path d="M0 0h16v16H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="text-primary text-label-lg">Popular</p>
                  </div>
                </div>
                <h3
                  className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                >
                  $250 <span className="text-lg">/ month</span>
                </h3>
                <p className="mt-1 text-md text-subtle">
                  $0.01 per gasless transaction + 5% of gas
                </p>
              </div>
              <ul className="flex-grow p-6 space-y-2">
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Up to 15,000 active wallets</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    Build custom experiences with our API
                  </span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Custom RPC</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Dedicated support</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    Everything from Individual plan
                  </span>
                </li>
              </ul>
              <div className="px-6 pb-6">
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Get an Api key
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m14.03 8.53-4.5 4.5a.751.751 0 1 1-1.062-1.062l3.22-3.218H2.5a.75.75 0 0 1 0-1.5h9.188L8.469 4.03a.751.751 0 0 1 1.063-1.063l4.5 4.5a.75.75 0 0 1-.001 1.064Z"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <div className="z-30 flex flex-col bg-white border rounded-md bg-opacity-5 border-primary">
              <div className="p-6 border-b border-default">
                <div className="flex flex-row items-center justify-between mb-2">
                  <p className="font-bold">Enterprise</p>
                </div>
                <h3
                  className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                >
                  Custom
                </h3>
                <p className="mt-1 text-md text-subtle">
                  Let's talk and find the best solution for you
                </p>
              </div>
              <ul className="flex-grow p-6 space-y-2">
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Unlimited active users</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    White label pre-built components
                  </span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Custom pricing</span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">
                    Custom features & integrations
                  </span>
                </li>
                <li className="flex flex-row items-center before:w-1 before:h-1 before:rounded-full before:bg-white/50 before:text-muted before:text-body-lg before:mr-2 before:inline-block">
                  <span className="text-md">Everything from Startup plan</span>
                </li>
              </ul>
              <div className="px-6 pb-6">
                <Button className="self-end w-full mt-6 font-bold rounded-lg bg-gradient-to-l from-primary to-tertiary">
                  Get an Api key
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m14.03 8.53-4.5 4.5a.751.751 0 1 1-1.062-1.062l3.22-3.218H2.5a.75.75 0 0 1 0-1.5h9.188L8.469 4.03a.751.751 0 0 1 1.063-1.063l4.5 4.5a.75.75 0 0 1-.001 1.064Z"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
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
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    Safety by Default
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
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
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    Accurate data where it matters
                  </h3>
                  <p className="text-left text-md text-white/75 grow">
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
          <div className="flex flex-row flex-wrap my-16 -mx-2 md:justify-center">
            <div className="w-full px-2 mb-4 md:w-1/3 xl:w-1/5">
              <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white w-full`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white w-full`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 grow">
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
              <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white w-full`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white w-full`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 grow">
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
              <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white w-full`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white w-full`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 grow">
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
              <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white w-full`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white w-full`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 grow">
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
              <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                <h3
                  className={`${lato.className} justify-center text-2xl pb-3 font-bold text-white w-full`}
                >
                  No Middlemen
                </h3>
                <h4
                  className={`${lato.className} justify-center text-md pb-3 font-bold text-white`}
                >
                  Subtitle
                </h4>
                <h5
                  className={`${lato.className} justify-center text-lg pb-3 font-bold text-white w-full`}
                >
                  Price
                </h5>
                <p className="text-left text-md text-white/75 grow">
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
