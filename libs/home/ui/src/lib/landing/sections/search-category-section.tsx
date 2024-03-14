import { memo } from 'react';

import { Bartab } from '@jobstash/shared/ui';

const SearchCategorySection = () => (
  <section className="relative mx-auto lg:max-w-6xl">
      <div className='my-8'>
        <svg className='h-[153px] mx-auto' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 630 159">
          <path fill="#fff" fill-opacity=".1" d="M.066 153a5.333 5.333 0 1 1 10.667 0 5.333 5.333 0 1 1-10.667 0Zm619.255 0a5.333 5.333 0 1 1 10.666 0 5.333 5.333 0 0 1-10.666 0ZM4.399 153V42.597h2V153h-2ZM5 41.597h.4v2H5v-2Zm.4 0h331.975v2H5.399v-2Zm332.446 1V0h2v42.597h-2ZM623.655 153V42.48h2V153h-2ZM625 43.48h-.345v-2H625v2Zm-.345 0H337.608v-2h287.047v2Z"/>
        </svg>
      </div>
      <div>
        <h3 className='text-white font-black text-6xl pb-6 text-center'>Search Crypto Jobs by <span className='text-secondary'>Category</span></h3>
        <div className='flex flex-wrap items-center justify-center space-y-2 space-x-2 pb-6'>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
          <div className='text-sm text-white border border-gray rounded-lg px-2.5 py-1.5'>Accounting</div>
        </div>
        <p className='text-white opacity-75 max-w-[500px] mx-auto text-md text-center'>Browse 35,640 blockchain jobs in web3 at 6,217 projects. Filter the best remote crypto jobs by salary, location, and skills.</p>
        <div className='w-[150px] mx-auto text-center'>
          <span className='inline-block opacity-75 pb-4 text-white text-md text-center'>or</span>
          <Bartab
              isActive={false}
              variant="wallet"
            >
              Explore Jobs
            </Bartab>
        </div>
      </div>
     
  </section>
);

export default memo(SearchCategorySection);
