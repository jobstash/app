import Image from 'next/image';

import { CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { ListCheck } from 'lucide-react';

const features = [
  {
    name: 'Support Decentralization',
    description:
      'Your organization must actively contribute to decentralization. This should be reflected in your products, services, or overall mission.',
    icon: LockClosedIcon,
  },
  {
    name: 'No Centralized Exchanges',
    description:
      'Centralized exchanges are not eligible for listing. We focus on decentralized projects that uphold the values of decentalization of the blockchain space.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Have a functioning product, or be clear about your roadmap',
    description:
      'Organizations must demonstrate they have a working product or service, or have a clear roadmap for development. Projects that are in the early stages of development are also eligible.',
  },
  {
    name: 'Have clear social media presence, and have documentation or a whitepaper',
    description:
      'Your organization must have multiple active social media accounts, or a well structured docs page or whitepaper. This ensures that your organization is transparent allows us to verify your legitimacy.',
  },
  {
    name: 'Have a Github Organization account',
    description:
      'Your organization should have a Github Organization account, even if currently set to private. This allows us to verify your organization and ensure that you are a legitimate project.',
  },
  {
    name: 'Maintain Job Integrity',
    description:
      'We require all organizationa to maintain the integrity of their job listings. This includes ensuring that all job listings are accurate, up-to-date, and reflect the true nature of the job. Malicious or deceptive postings will result in a ban.',
  },
];

export const OrgCriteria = () => (
  <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6 px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            What we require from your organization
          </span>
          <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-4xl font-bold text-transparent">
            Organization Eligibility
          </h2>
        </div>
        <p className="text-lg leading-8 text-white/90">
          We are committed to fostering decentralization and working with
          organizations that align with the ethos of the crypto space. To be
          listed on our platform, your organization must meet the following
          criteria. This ensures that we curate only legitimate projects, and
          allows us to safeguard our users from potential threats.
        </p>
        <dl className="space-y-8 text-base leading-7 text-white/90">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-white/90">
                <ListCheck
                  aria-hidden="true"
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-400"
                />
                {`${feature.name}. `}
              </dt>
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex justify-center mt-4 md:mt-0">
        <Image
          alt="Job Details"
          src="/org-details.png"
          width={541}
          height={1107}
          className="rounded-md"
        />
      </div>
    </div>
  </div>
);

// <div className="mx-auto max-w-7xl px-6 lg:px-8">
//   <div className="mx-auto max-w-2xl lg:text-center">
//     <div className="flex flex-col gap-2">
//       <span className="text-base font-semibold text-indigo-300">
//         Who We Work With
//       </span>

//       <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
//         Organization Eligibility
//       </h2>
//     </div>
//     <p className="mt-6 text-lg leading-8 text-white/90">
//       We are committed to fostering decentralization and working with
//       organizations that align with the ethos of the crypto space. To be
//       listed on our platform, your organization must meet the following
//       criteria, ensuring that we curate only the most legitimate and
//       decentralized projects.
//     </p>
//   </div>
//   <div className="mx-auto max-w-2xl lg:max-w-none">
//     <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
//       {features.map((feature) => (
//         <div key={feature.name} className="flex flex-col">
//           <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
//             <feature.icon
//               aria-hidden="true"
//               className="h-5 w-5 flex-none text-indigo-400"
//             />
//             {feature.name}
//           </dt>
//           <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-white/90">
//             <p className="flex-auto">{feature.description}</p>
//           </dd>
//         </div>
//       ))}
//     </dl>
//   </div>
// </div>
