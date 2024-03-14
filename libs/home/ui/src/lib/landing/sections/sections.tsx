import { memo } from 'react';

import CandidateDaoSection from './candidate-dao-section';
// import PremiumSection from './premium-section';
// import StatsSection from './stats-section';
// import TooLateSection from './too-late-section';

import LandingSection from './landing-section';
import SearchCategorySection from './search-category-section';
import SetsUsSection from './sets-us-section';
import TestimonialSection from './testimonial-section';
import CoffeeSection from './coffee-section';
import SearchSkillSection from './search-skill-section';
import { roboto } from '@jobstash/shared/core';

const LandingSections = () => (
  <main className={`${roboto.className} pt-[80px]`}>
    <LandingSection />
    <SearchCategorySection />
    <SetsUsSection />
    <CandidateDaoSection />
    <TestimonialSection />
    <CoffeeSection />
    <SearchSkillSection />
  </main>
);

export default memo(LandingSections);
