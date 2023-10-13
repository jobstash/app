import Head from 'next/head';

import { LayoutGroup, motion } from 'framer-motion';

import { cn } from '@jobstash/shared/utils';

import { HomeSearchProvider } from '@jobstash/home/state';

import { FeaturedJobs, FeaturedOrgs, HomeSearch } from '@jobstash/home/ui';
import { SideBar } from '@jobstash/sidebar/feature';

const HomePage = () => (
  <>
    <Head>
      <title>JobStash</title>
    </Head>
    <div className="w-full lg:pl-52">
      <SideBar />

      <p>TODO</p>
      {/* <LayoutGroup>
        <motion.div
          layout
          className={cn(
            'px-3.5 pt-[65px] lg:px-8 lg:pt-0 lg:pr-[50%] flex flex-col gap-8',
          )}
        >
          <motion.div layout>
            <HomeSearchProvider>
              <HomeSearch />
            </HomeSearchProvider>
          </motion.div>
          <motion.div layout>
            <FeaturedJobs />
          </motion.div>
          <motion.div layout>
            <FeaturedOrgs />
          </motion.div>
        </motion.div>
      </LayoutGroup> */}

      <div
        className={cn(
          'hide-scrollbar fixed inset-0 h-screen overflow-y-auto bg-dark p-4 pt-6 transition-all lg:inset-auto lg:right-0 lg:top-0 lg:w-5/12 lg:px-6 lg:py-8 lg:pr-10',
        )}
      >
        <p>Categories</p>
        <p>Top Tags</p>
      </div>
    </div>
  </>
);

export default HomePage;
