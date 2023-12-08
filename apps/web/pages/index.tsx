import {
  LandingBalls,
  LandingFooter,
  LandingMetadata,
  LandingNav,
  LandingScripts,
  LandingSections,
} from '@jobstash/home/ui';

const HomePage = () => (
  <>
    <LandingScripts />

    <LandingMetadata />

    <LandingBalls />

    <div className="px-6 md:px-10">
      <LandingNav />
      <LandingSections />
      <LandingFooter />
    </div>
  </>
);

export default HomePage;
