import Image from 'next/image';
import { memo } from 'react';

const LandingBalls = () => (
  <div className="flex select-none justify-center">
    <div className="animation-rotation fixed top-20 -z-50 h-[25vh] w-[95vw] sm:top-[15vh] sm:h-[40vh] sm:w-[100vw] xl:top-[15vh] xl:h-[100vh] xl:w-[100vw] 2xl:h-[100vh] 2xl:w-[85vw]">
      <Image
        fill
        priority
        src="/landing-balls-big.png"
        alt="big landing ball"
        className="object-contain object-right-top opacity-10 lg:object-left-top"
        sizes="(max-width: 640px) 95vw,
		(max-width: 1280px): 100vw,
		85vw"
      />
    </div>
    <div className="animation-rotation fixed top-40 -z-50 h-[35vh] w-[90vw] sm:top-[40vh] sm:h-[35vh] sm:w-[90vw] xl:top-[18vh] xl:h-[75vh] xl:w-[100vw] 2xl:h-[70vh] 2xl:w-[90vw]">
      <Image
        fill
        priority
        src="/landing-balls-small.png"
        alt="small landing ball"
        className="object-contain object-left-bottom opacity-70 lg:object-right-top"
        sizes="(max-width: 640px) 90vw,
		(max-width: 1280px): 100vw,
		90vw"
      />
    </div>
  </div>
);

export default memo(LandingBalls);
