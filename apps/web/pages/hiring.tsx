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
      <div className="px-6 py-16 md:py-12 md:px-10">
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Organisations
          </h3>
          <p className="text-white opacity-75 max-w-[640px] mx-auto text-lg text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            dignissim porta scelerisque. Praesent venenatis nisi quam, a malesuada
            nunc scelerisque at.
          </p>
        </section>
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Stats
          </h3>
          <p className="text-white opacity-75 max-w-[640px] mx-auto text-lg text-center">
            July '24
          </p>
          <div className="mx-auto">
            <StatsGrid />
          </div>
        </section>
        <section className='pb-6 md:pb-14'>
          <h3
            className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-4 md:pb-8`}
          >
            Our Pricing
          </h3>
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-4 mb-4 place-content-center lg:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
            </div>
          </div>
        </section>
        <section className="mx-auto">
          <div>
            <h3
              className={`${lato.className} text-white !leading-tight font-black text-5xl md:text-6xl text-center`}
            >
              Services
            </h3>
            <div className="flex flex-row flex-wrap mx-auto mt-6 -mx-2 lg:max-w-6xl">
              <div className="w-full px-2 mb-4 md:w-1/2">
                <div className="flex flex-wrap justify-start h-full p-5 bg-white bg-opacity-5 rounded-3xl">
                  <h3
                    className={`${lato.className} justify-center text-3xl pb-3 font-bold text-white`}
                  >
                    Feature your Jobs
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
        <section className="relative flex flex-col items-center pt-16 lg:mx-auto lg:max-w-6xl">
          <div className="flex flex-col items-center">
            <h3 className="text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6">
              Our Services
              <span className="block text-secondary"></span>
            </h3>
          </div>
          <div className="flex flex-wrap w-full pt-12 -mx-2 md:-mx-4">
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex flex-col justify-center w-full p-5 space-y-4 bg-white rounded-2xl bg-opacity-5 md:p-6">
                <h4 className="text-white !leading-tight font-bold text-3xl md:text-4xl text-center pb-4">
                  SAFU ATS and Candidate Due Diligence
                </h4>
                <iframe
                  src="https://drive.google.com/file/d/1VVoyR3vy9xrzy8hwzPUzxOAMvRQLZEQb/preview"
                  width="100%"
                  height="600"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
            <div className="w-full px-2 mb-4 md:w-1/2">
              <div className="flex flex-col justify-center w-full p-5 space-y-4 bg-white rounded-2xl bg-opacity-5 md:p-6">
                <h4 className="text-white !leading-tight font-bold text-3xl md:text-4xl text-center pb-4">
                  Feature your jobs & JobStash impact and performance
                </h4>
                <iframe
                  src="https://drive.google.com/file/d/1yuVMUrqBe6EgdB76ZVusSt5AWM_QaYxo/preview"
                  width="100%"
                  height="600"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  </>
);

export default OrganizationsPage;
