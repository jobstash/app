import { memo } from 'react';

import { Bartab } from '@jobstash/shared/ui';

const CoffeeSection = () => (
  <section className="relative mx-auto mt-16 lg:max-w-6xl">
    <div>
      <h3 className='text-white font-black text-6xl pb-6 text-center'>Buy Me a Coffee</h3>
      <p className='text-white opacity-75 max-w-[500px] mx-auto text-md text-center'>This is an incredible amount of hours that we have put there for the better for all. Please help us to keep going.</p>
      <div className='w-[150px] mx-auto text-center mt-8'>
        <Bartab
            isActive={false}
            variant="wallet"
          >
            Donate
          </Bartab>
      </div>
    </div>
  </section>
);

export default memo(CoffeeSection);
