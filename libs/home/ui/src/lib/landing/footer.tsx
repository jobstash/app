import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const LandingFooter = () => (
  <footer className=" flex flex-col space-y-8 pb-8 pt-24 lg:mx-auto lg:max-w-6xl">
    <div className="lg:flex lg:justify-between">
      <div className="space-y-4">
        <div className="w-1/2 lg:w-auto">
          <Image
            src="/brand-footer.png"
            width={160}
            height={40}
            alt="JobStash Crypto Developer Jobs"
          />
        </div>

        <div className="text-white/60">
          <span>The Ultimate Crypto Native Job Aggregator</span>
        </div>
      </div>
      <div className="flex flex-col space-y-6 pt-12 lg:pt-0">
        <div className=" flex h-full flex-wrap items-end">
          {/* <h4 className="text-2xl font-medium md:text-4xl md:leading-snug	">Join</h4> */}
          <div className="flex flex-col space-y-2">
            {/* <span>Create developer profile</span>
            <span>Create organization profile</span> */}

            <div className="flex space-x-4">
              <a
                href="https://telegram.me/jobstashxyz"
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon />
              </a>

              <a
                href="https://twitter.com/jobstash_xyz"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr className="h-px border-0 bg-white/50" />

    <div className="flex w-full items-center justify-between">
      <span className="text-white/40">
        Built with{' '}
        <span role="img" aria-label="flame-heart">
          ❤️‍🔥
        </span>{' '}
        by the JobStash Team
      </span>
      <div className="flex items-center gap-4">
        <Link href="/terms-and-conditions" className="text-white/60">
          Terms and Conditions
        </Link>
        <Link href="/privacy" className="text-white/60">
          Privacy
        </Link>
      </div>
    </div>
  </footer>
);

export default memo(LandingFooter);

const TelegramIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Telegram Direct Message</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.13634 16.5047C4.13634 16.5047 3.44417 16.3627 3.00208 15.8351C3.00208 15.8351 2.59976 15.355 2.54149 14.7213C2.54149 14.7213 2.48298 14.085 2.79381 13.5405C2.79381 13.5405 3.1362 12.9406 3.79673 12.6818L26.8758 3.61767C26.8758 3.61767 27.3919 3.41759 27.9374 3.51132C27.9374 3.51132 28.483 3.60506 28.9027 3.96593C28.9027 3.96593 29.3224 4.3268 29.4968 4.85211C29.4968 4.85211 29.6713 5.37741 29.5496 5.92326L24.8494 26.4488C24.8494 26.4488 24.731 26.9647 24.3729 27.3545C24.3729 27.3545 24.0148 27.7442 23.5107 27.9058C23.5107 27.9058 23.0067 28.0674 22.4887 27.9585C22.4887 27.9585 21.9707 27.8497 21.5767 27.5008L10.5403 17.7903L4.14046 16.5055L4.13634 16.5047ZM4.53411 14.5446L11.1966 15.8821C11.3687 15.9167 11.5286 15.9959 11.6604 16.1118L22.8979 25.9993L22.9001 26.0013L27.5988 5.48244L4.52784 14.5433L4.53411 14.5446Z"
      fill="white"
    />
    <path
      d="M28.5974 5.38585C28.8577 5.19784 29.0123 4.89605 29.0123 4.57495C29.0123 4.55946 29.0119 4.54396 29.0112 4.52848C29.0021 4.33432 28.9367 4.14701 28.8229 3.98944C28.6676 3.77444 28.4333 3.62993 28.1715 3.58771C28.1188 3.57922 28.0656 3.57495 28.0123 3.57495C28.0007 3.57495 27.9892 3.57515 27.9777 3.57555C27.7794 3.5824 27.5876 3.6481 27.4267 3.76429L10.4148 16.0514C10.1998 16.2067 10.0547 16.4414 10.0125 16.7032C10.004 16.7559 9.99976 16.8091 9.99976 16.8625C9.99976 16.874 9.99995 16.8855 10.0004 16.897C10.0072 17.0953 10.0729 17.2871 10.1891 17.448C10.3771 17.7083 10.6787 17.8625 10.9998 17.8625C11.0152 17.8625 11.0307 17.8621 11.0462 17.8614C11.2404 17.8523 11.4277 17.7869 11.5853 17.6731L28.5974 5.38585Z"
      fill="white"
    />
    <path
      d="M11.9998 24.9984V16.8625C11.9998 16.3103 11.552 15.8625 10.9998 15.8625C10.4475 15.8625 9.99976 16.3102 9.99976 16.8625V25C10.0008 25.61 10.3403 26.1148 10.3403 26.1148C10.6799 26.6195 11.243 26.8497 11.243 26.8497C11.8061 27.0799 12.402 26.9575 12.402 26.9575C12.9979 26.8352 13.4248 26.4017 13.4248 26.4017L17.3194 22.5072C17.5069 22.3196 17.6123 22.0653 17.6123 21.8C17.6123 21.5348 17.5069 21.2805 17.3194 21.0929C17.1318 20.9054 16.8775 20.8 16.6123 20.8C16.347 20.8 16.0927 20.9054 15.9051 21.0929L11.9998 24.9984Z"
      fill="white"
    />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Twitter Profile</title>
    <path
      d="M16.0007 11.0005C16.0007 8.25045 18.3132 5.96295 21.0632 6.00045C22.0262 6.01157 22.9656 6.3006 23.7683 6.8328C24.571 7.365 25.203 8.11771 25.5882 9.00045H30.0007L25.9632 13.038C25.7026 17.0937 23.9073 20.8979 20.9422 23.6773C17.9771 26.4566 14.0648 28.0025 10.0007 28.0005C6.00068 28.0005 5.00068 26.5005 5.00068 26.5005C5.00068 26.5005 9.00068 25.0005 11.0007 22.0005C11.0007 22.0005 3.00068 18.0005 5.00068 7.00045C5.00068 7.00045 10.0007 12.0005 16.0007 13.0005V11.0005Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
