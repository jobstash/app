import { memo } from 'react';

import { Advantage } from './advantage';

const CandidateDaoSection = () => (
  <section className="relative flex flex-col items-center pt-16 lg:mx-auto lg:max-w-6xl">
    <div className="flex flex-col items-center">
      <h3 className="text-white !leading-tight font-black text-5xl md:text-6xl text-center pb-6">
        All Crypto Native Jobs in One Place.
        <span className="block text-secondary">None of the BS</span>
      </h3>
    </div>
    <p className="text-white opacity-75 max-w-[500px] mx-auto text-md text-center">
      We provide you with unrestricted access to jobs at top organizations,
      protocols, networks, DAOs, dApps and companies. For these organizations
      and projects, we show financial metrics from DefiLlama, Hacks and Audits
      from De.Fi and enrich it with our own propietary data.
    </p>
    <div className="flex flex-wrap w-full pt-12 -mx-2 md:-mx-4">
      <Advantage
        icon={<DevAdvIcon />}
        title={devsAdv.title}
        desc={devsAdv.desc}
        advantages={devsAdv.advantages}
        buttonTitle='JobStash for candidates'
        buttonURL='/candidates'
      />

      <Advantage
        icon={<DaoAdvIcon />}
        title={companiesAdv.title}
        desc={companiesAdv.desc}
        advantages={companiesAdv.advantages}
        buttonTitle='JobStash for organizations'
        buttonURL='/hiring'
      />
    </div>
  </section>
);

export default memo(CandidateDaoSection);

const DevAdvIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 0.5C13.5 0.5 16.1442 0.5 18.5605 1.52201C18.5605 1.52201 20.8936 2.50884 22.6924 4.30761C22.6924 4.30761 24.4912 6.10638 25.478 8.43951C25.478 8.43951 26.5 10.8558 26.5 13.5C26.5 13.5 26.5 16.1442 25.478 18.5605C25.478 18.5605 24.4912 20.8936 22.6924 22.6924C22.6924 22.6924 20.8936 24.4912 18.5605 25.478C18.5605 25.478 16.1442 26.5 13.5 26.5C13.5 26.5 10.8558 26.5 8.43951 25.478C8.43951 25.478 6.10638 24.4912 4.30761 22.6924C4.30761 22.6924 2.50884 20.8936 1.52202 18.5605C1.52202 18.5605 0.5 16.1442 0.5 13.5C0.5 13.5 0.5 10.8558 1.52202 8.43951C1.52202 8.43951 2.50885 6.10638 4.30761 4.30761C4.30761 4.30761 6.10638 2.50884 8.43951 1.52201C8.43951 1.52201 10.8558 0.5 13.5 0.5ZM13.5 2.5C13.5 2.5 11.2614 2.5 9.21861 3.36402C9.21861 3.36402 7.24476 4.19889 5.72183 5.72182C5.72183 5.72182 4.1989 7.24476 3.36402 9.21861C3.36402 9.21861 2.5 11.2614 2.5 13.5C2.5 13.5 2.5 15.7386 3.36402 17.7814C3.36402 17.7814 4.19889 19.7552 5.72183 21.2782C5.72183 21.2782 7.24476 22.8011 9.21861 23.636C9.21861 23.636 11.2614 24.5 13.5 24.5C13.5 24.5 15.7386 24.5 17.7814 23.636C17.7814 23.636 19.7552 22.8011 21.2782 21.2782C21.2782 21.2782 22.8011 19.7552 23.636 17.7814C23.636 17.7814 24.5 15.7386 24.5 13.5C24.5 13.5 24.5 11.2614 23.636 9.21861C23.636 9.21861 22.8011 7.24476 21.2782 5.72183C21.2782 5.72183 19.7552 4.19889 17.7814 3.36402C17.7814 3.36402 15.7386 2.5 13.5 2.5Z"
      fill="#4337F2"
    />
    <path
      d="M10.5 13.5C10.5 14.3284 9.82837 15 9 15C8.17163 15 7.5 14.3284 7.5 13.5C7.5 12.6716 8.17163 12 9 12C9.82837 12 10.5 12.6716 10.5 13.5Z"
      fill="#4337F2"
    />
    <path
      d="M19.5 13.5C19.5 14.3284 18.8284 15 18 15C17.1716 15 16.5 14.3284 16.5 13.5C16.5 12.6716 17.1716 12 18 12C18.8284 12 19.5 12.6716 19.5 13.5Z"
      fill="#4337F2"
    />
    <path
      d="M10.7407 17.667C10.5768 17.5581 10.3843 17.5 10.1875 17.5L10.1819 17.5C9.84891 17.5019 9.5387 17.6694 9.35448 17.9468C9.24558 18.1107 9.1875 18.3032 9.1875 18.5L9.18752 18.5056C9.18938 18.8386 9.35687 19.1488 9.63426 19.333C11.3909 20.4995 13.5 20.4998 13.5 20.4998C15.6089 20.4998 17.3657 19.333 17.3657 19.333C17.6448 19.1477 17.8125 18.835 17.8125 18.5L17.8125 18.4928C17.8111 18.2984 17.7531 18.1087 17.6455 17.9468C17.4602 17.6677 17.1475 17.5 16.8125 17.5L16.8053 17.5C16.6109 17.5014 16.4212 17.5594 16.2593 17.667C15.0053 18.4998 13.5 18.4998 13.5 18.4998C11.9948 18.4998 10.7407 17.667 10.7407 17.667Z"
      fill="#4337F2"
    />
    <path
      d="M15.6213 8.62132C16.5 7.74264 16.5 6.5 16.5 6.5C16.5 5.94772 16.0523 5.5 15.5 5.5C14.9477 5.5 14.5 5.94772 14.5 6.5C14.5 6.91421 14.2071 7.20711 14.2071 7.20711C13.9142 7.5 13.5 7.5 13.5 7.5C13.0858 7.5 12.7929 7.20711 12.7929 7.20711C12.5 6.91421 12.5 6.5 12.5 6.5C12.5 6.00604 12.7162 5.19516 12.7162 5.19516C13.1621 3.52335 14.2806 2.12504 14.2806 2.12504C14.4224 1.94773 14.5 1.72707 14.5 1.5L14.5 1.4928C14.4978 1.19155 14.3599 0.907328 14.1247 0.719131C13.9474 0.577281 13.7271 0.5 13.5 0.5L13.4928 0.500026C13.1915 0.502194 12.9073 0.640059 12.7191 0.875305C11.3379 2.60185 10.7838 4.67984 10.7838 4.67984C10.5 5.74396 10.5 6.5 10.5 6.5C10.5 7.74264 11.3787 8.62132 11.3787 8.62132C12.2574 9.5 13.5 9.5 13.5 9.5C14.7426 9.5 15.6213 8.62132 15.6213 8.62132Z"
      fill="#4337F2"
    />
  </svg>
);

const DaoAdvIcon = () => (
  <svg
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 17.5C21.5 20.2615 19.2615 22.5 16.5 22.5C13.7385 22.5 11.5 20.2615 11.5 17.5C11.5 14.7385 13.7385 12.5 16.5 12.5C19.2615 12.5 21.5 14.7385 21.5 17.5Z"
      fill="#4337F2"
    />
    <path
      d="M12 10.5C12 12.7092 10.2092 14.5 8 14.5C5.79077 14.5 4 12.7092 4 10.5C4 8.29077 5.79077 6.5 8 6.5C10.2092 6.5 12 8.29077 12 10.5Z"
      fill="#4337F2"
    />
    <path
      d="M29 10.5C29 12.7092 27.2092 14.5 25 14.5C22.7908 14.5 21 12.7092 21 10.5C21 8.29077 22.7908 6.5 25 6.5C27.2092 6.5 29 8.29077 29 10.5Z"
      fill="#4337F2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5 11.5C16.5 11.5 18.9853 11.5 20.7426 13.2574C20.7426 13.2574 22.5 15.0147 22.5 17.5C22.5 17.5 22.5 19.9853 20.7426 21.7426C20.7426 21.7426 18.9853 23.5 16.5 23.5C16.5 23.5 14.0147 23.5 12.2574 21.7426C12.2574 21.7426 10.5 19.9853 10.5 17.5C10.5 17.5 10.5 15.0147 12.2574 13.2574C12.2574 13.2574 14.0147 11.5 16.5 11.5ZM16.5 13.5C16.5 13.5 14.8431 13.5 13.6716 14.6716C13.6716 14.6716 12.5 15.8431 12.5 17.5C12.5 17.5 12.5 19.1569 13.6716 20.3284C13.6716 20.3284 14.8431 21.5 16.5 21.5C16.5 21.5 18.1569 21.5 19.3284 20.3284C19.3284 20.3284 20.5 19.1569 20.5 17.5C20.5 17.5 20.5 15.8431 19.3284 14.6716C19.3284 14.6716 18.1569 13.5 16.5 13.5Z"
      fill="#4337F2"
    />
    <path
      d="M30.1984 18.0982L30.1987 18.0987C30.3575 18.3111 30.5942 18.4518 30.8566 18.4897C30.904 18.4966 30.9518 18.5 30.9997 18.5L31.0015 18.5C31.2167 18.4996 31.426 18.4298 31.5984 18.301C31.851 18.1122 31.9997 17.8154 31.9997 17.5L31.9997 17.4886C31.9972 17.2767 31.9276 17.0711 31.8007 16.9013L31.7999 16.9002C30.5979 15.2925 28.8024 14.3947 28.8024 14.3947C27.0062 13.4967 24.998 13.5 24.998 13.5L24.9997 13.5C25.552 13.5 25.9997 13.9477 25.9997 14.5C25.9997 15.0514 25.5534 15.4988 25.0019 15.5L30.1984 18.0982Z"
      fill="#4337F2"
    />
    <path
      d="M5.09179 16.1836C6.46407 15.4974 7.99833 15.5 7.99833 15.5L7.99973 15.5H8C8.01546 15.5 8.03092 15.4997 8.04637 15.4989C8.2947 15.4874 8.52984 15.3838 8.70592 15.2083C8.89377 15.0211 8.99956 14.7669 9 14.5017L9 14.5003V14.5C9 14.4395 8.99451 14.3792 8.98361 14.3197C8.89668 13.8455 8.48378 13.5008 8.00167 13.5L8 13.5C5.99277 13.497 4.19736 14.3947 4.19736 14.3947C2.40184 15.2925 1.19985 16.9002 1.19985 16.9002L1.19913 16.9012C1.06981 17.0742 1 17.2842 1 17.5L1.00005 17.5105C1.00052 17.5549 1.00394 17.5992 1.01029 17.6431C1.04823 17.9056 1.1889 18.1422 1.40134 18.301C1.57419 18.4302 1.7842 18.5 2 18.5C2.01337 18.5 2.02674 18.4997 2.0401 18.4992C2.34112 18.4871 2.62065 18.34 2.801 18.0987C3.7195 16.8697 5.09179 16.1836 5.09179 16.1836Z"
      fill="#4337F2"
    />
    <path
      d="M20.2155 24.5677C21.9194 25.6319 22.8013 27.4367 22.8013 27.4367L22.8019 27.4379L22.8022 27.4385C22.9699 27.7819 23.3186 27.9997 23.7008 27.9997L23.7282 27.9994C23.8709 27.9954 24.0112 27.961 24.1396 27.8983C24.483 27.7306 24.7008 27.3819 24.7008 26.9997L24.7004 26.9723C24.6965 26.8296 24.662 26.6893 24.5994 26.561L24.599 26.5602C23.4656 24.2395 21.275 22.8713 21.275 22.8713C19.084 21.5029 16.5008 21.5029 16.5008 21.5029C13.9176 21.5029 11.7266 22.8713 11.7266 22.8713C9.53601 24.2395 8.40257 26.5602 8.40257 26.5602L8.40223 26.5609C8.33546 26.6976 8.30078 26.8477 8.30078 26.9997L8.30087 27.0127C8.30225 27.119 8.32056 27.2244 8.35512 27.3249C8.44135 27.5757 8.62368 27.782 8.862 27.8983C8.99865 27.965 9.14871 27.9997 9.30078 27.9997L9.32374 27.9995C9.69754 27.9909 10.0353 27.7745 10.1994 27.4385C11.0813 25.6324 12.7861 24.5677 12.7861 24.5677C14.4908 23.5029 16.5008 23.5029 16.5008 23.5029C18.5107 23.5029 20.2155 24.5677 20.2155 24.5677Z"
      fill="#4337F2"
    />
    <path
      d="M10.1825 8.44595C10.7794 9.0813 10.9429 9.9376 10.9429 9.9376C10.9926 10.1981 11.1438 10.4282 11.3632 10.5772C11.529 10.6899 11.7247 10.7501 11.9252 10.7501L11.9316 10.7501C11.9924 10.7497 12.053 10.7438 12.1127 10.7324C12.5841 10.6424 12.9252 10.2301 12.9252 9.7501L12.9251 9.74446C12.9248 9.68343 12.9189 9.62255 12.9074 9.5626C12.635 8.13543 11.6401 7.07651 11.6401 7.07651C10.6453 6.0176 9.23788 5.65676 9.23788 5.65676C7.83047 5.29591 6.44885 5.74552 6.44885 5.74552C5.06723 6.19514 4.14173 7.31517 4.14173 7.31517C3.21623 8.4352 3.03511 9.8768 3.03511 9.8768C2.85398 11.3184 3.47366 12.6326 3.47366 12.6326C4.09333 13.9467 5.32078 14.7242 5.32078 14.7242C6.54781 15.5013 8.00016 15.5001 8.00016 15.5001L8.00118 15.5001C8.26639 15.4998 8.52064 15.3942 8.70799 15.2065C8.89508 15.019 9.00016 14.765 9.00016 14.5001L9.00016 14.4991C8.9996 13.9472 8.55205 13.5001 8.00016 13.5001L7.99915 13.5001C7.12739 13.501 6.39091 13.0345 6.39091 13.0345C5.65444 12.5681 5.28263 11.7796 5.28263 11.7796C4.91083 10.9911 5.01951 10.1261 5.01951 10.1261C5.12818 9.26116 5.68348 8.58914 5.68348 8.58914C6.23878 7.91712 7.06775 7.64735 7.06775 7.64735C7.89672 7.37759 8.74117 7.59409 8.74117 7.59409C9.58562 7.8106 10.1825 8.44595 10.1825 8.44595Z"
      fill="#4337F2"
    />
    <path
      d="M26.6085 13.0345C25.872 13.501 25.0002 13.5001 25.0002 13.5001L24.9992 13.5001C24.9835 13.5001 24.9679 13.5005 24.9522 13.5012L24.0003 14.5471C24.012 14.7954 24.1158 15.0305 24.2914 15.2065C24.4787 15.3942 24.733 15.4998 24.9982 15.5001L24.9992 15.5001C26.4516 15.5013 27.6786 14.7242 27.6786 14.7242C28.9061 13.9467 29.5257 12.6326 29.5257 12.6326C30.1454 11.3184 29.9643 9.8768 29.9643 9.8768C29.7832 8.4352 28.8577 7.31517 28.8577 7.31517C27.9321 6.19514 26.5505 5.74552 26.5505 5.74552C25.1689 5.29591 23.7615 5.65676 23.7615 5.65676C22.3541 6.0176 21.3592 7.07651 21.3592 7.07651C20.3644 8.13543 20.092 9.5626 20.092 9.5626C20.0802 9.6244 20.0742 9.68718 20.0742 9.7501C20.0742 9.78015 20.0756 9.81018 20.0783 9.84011C20.1185 10.2846 20.4483 10.6487 20.8867 10.7324C20.9485 10.7442 21.0113 10.7501 21.0742 10.7501C21.1043 10.7501 21.1343 10.7487 21.1642 10.746C21.6087 10.7059 21.9728 10.376 22.0565 9.9376C22.2199 9.0813 22.8168 8.44595 22.8168 8.44595C23.4138 7.8106 24.2582 7.59409 24.2582 7.59409C25.1027 7.37759 25.9316 7.64735 25.9316 7.64735C26.7606 7.91712 27.3159 8.58914 27.3159 8.58914C27.8712 9.26116 27.9799 10.1261 27.9799 10.1261C28.0885 10.9911 27.7167 11.7796 27.7167 11.7796C27.3449 12.5681 26.6085 13.0345 26.6085 13.0345Z"
      fill="#4337F2"
    />
  </svg>
);

const devsAdv = {
  title: 'Candidates',
  desc: 'Spot that Perfect Job and Get Hired by the Best Organizations in Crypto',
  advantages: [
    {
      emoji: '💻',
      desc: 'Find the newest jobs in Crypto before anyone else does',
    },
    {
      emoji: '💰',
      desc: 'Evaluate Financial Upside with Accurate Financial Metrics',
    },
    {
      emoji: '🔧',
      desc: 'Get Technical Insights About the Job and the Project',
    },
    {
      emoji: '📚',
      desc: 'Find Out Which Skills Future Colleagues can Mentor You on',
    },
    {
      emoji: '🔎',
      desc: 'Narrow Down Your Options with Filtering and Sorting Features',
    },
    {
      emoji: '🚫',
      desc: 'No Unclear Job Descriptions and Recruiters Spamming You',
    },
    {
      emoji: '🗜',
      desc: 'Direct Contact With the Hiring Team and No Middlemen',
    },
    {
      emoji: '🔒',
      desc: 'Choose Whether to Be Discovered or Stay Anonymous',
    },
    {
      emoji: '⚡️',
      desc: 'Take Charge of Your Career with Zero Cost to You!',
    },
  ],
};

const companiesAdv = {
  title: 'Organizations, Companies and DAOs',
  desc: 'Receive Relevant Job Applications and Source the Right Candidates',
  advantages: [
    {
      emoji: '🚪',
      desc: 'Get Access to Qualified and Relevant Candidates',
    },
    {
      emoji: '⏰',
      desc: 'Save Time with Automatic Job Publishing with No Required Effort',
    },
    {
      emoji: '💻',
      desc: 'Your Jobs and Projects get Enriched with Relevant Data',
    },
    {
      emoji: '📱',
      desc: 'Permanent Presence on Our Platform Even When Hiring is on Hold',
    },
    {
      emoji: '🔌',
      desc: 'Cut Out the Middlemen and Be Contacted Directly by Candidates',
    },
    {
      emoji: '📝',
      desc: 'Keep Your Job Posts Accurate with Easy Editing Options',
    },
    {
      emoji: '⚖️',
      desc: 'Fair and Unbiased Placement of Your Job Posts',
    },
    {
      emoji: '📊',
      desc: 'Automatic Unpublishing of Your Jobsposts as they get Filled',
    },
    {
      emoji: '💰',
      desc: 'Enhance your reach by using our premium services. 5X the leads!',
    },
  ],
};
