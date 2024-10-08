import { memo } from 'react';

import { roboto } from '@jobstash/shared/core';

import CandidateDaoSection from './candidate-dao-section';
import CoffeeSection from './coffee-section';
// Import PremiumSection from './premium-section';
// import StatsSection from './stats-section';
// import TooLateSection from './too-late-section';
import LandingSection from './landing-section';
import SearchCategorySection from './search-category-section';
import SearchSkillSection from './search-skill-section';
import SetsUsSection from './sets-us-section';
import TestimonialSection from './testimonial-section';

const LandingSections = () => (
  <main className={`${roboto.className} pt-[80px]`}>
    <LandingSection />
    <CandidateDaoSection />
    <SearchCategorySection />
    <SetsUsSection />
    <TestimonialSection />
    <CoffeeSection />
    <SearchSkillSection />
  </main>
);

export default memo(LandingSections);
