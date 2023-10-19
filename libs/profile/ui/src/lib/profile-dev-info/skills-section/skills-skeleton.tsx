import SkillsWrapper from './skills-wrapper';

const SKELETON_WIDTHS = ['w-20', 'w-14', 'w-28', 'w-20', 'w-12', 'w-24'];

const SkillsSkeleton = () => (
  <SkillsWrapper>
    {SKELETON_WIDTHS.map((w, i) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={`${w}-${i}`}
        className={`h-8 bg-white/20 rounded-md ${w} animate-pulse`}
      />
    ))}
  </SkillsWrapper>
);

export default SkillsSkeleton;
