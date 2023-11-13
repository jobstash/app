import { memo } from 'react';

import CandidateDaoSection from './candidate-dao-section';
import LandingSection from './landing-section';
import PremiumSection from './premium-section';
import StatsSection from './stats-section';
import TooLateSection from './too-late-section';

const LandingSections = () => (
  <main className="pt-[80px]">
    <LandingSection />
    <CandidateDaoSection />
    <PremiumSection />
    <TooLateSection />
    <StatsSection />
  </main>
);

export default memo(LandingSections);
