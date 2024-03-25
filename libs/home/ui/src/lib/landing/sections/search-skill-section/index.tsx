import { memo } from 'react';

import { PopularSkills } from './popular-skills';

const SearchSkillSection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
    <div className="my-10">
      <svg
        className="w-4/5 md:h-[153px] mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 664 159"
      >
        <path
          fill="#fff"
          fillOpacity=".1"
          d="M.066 153a5.333 5.333 0 1 1 10.667 0 5.333 5.333 0 1 1-10.667 0Zm619.255 0a5.333 5.333 0 1 1 10.666 0 5.333 5.333 0 0 1-10.666 0ZM4.399 153V42.597h2V153h-2ZM5 41.597h.4v2H5v-2Zm.4 0h331.975v2H5.399v-2Zm332.446 1V0h2v42.597h-2ZM623.655 153V42.48h2V153h-2ZM625 43.48h-.345v-2H625v2Zm-.345 0H337.608v-2h287.047v2Z"
        />
      </svg>
    </div>
    <div className='space-y-6'>
      <h3 className="text-white !leading-tight font-black text-6xl text-center">
        Search Crypto Jobs by <span className="text-secondary">Skill</span>
      </h3>

      <PopularSkills />
    </div>
  </section>
);

export default memo(SearchSkillSection);
