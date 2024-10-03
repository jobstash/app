import Image from 'next/image';

import { CloudArrowUpIcon, LockClosedIcon } from '@heroicons/react/20/solid';
import { ListCheck } from 'lucide-react';

const features = [
  {
    name: 'No Centralized Exchanges',
    description:
      'Centralized exchanges are not eligible for listing. We focus on decentralized projects that uphold integrity and autonomy in the blockchain space.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Support Decentralization',
    description:
      'Your organization must actively contribute to decentralization. This should be reflected in your products, services, or overall mission.',
    icon: LockClosedIcon,
  },
  {
    name: 'Verified Crypto Organization',
    description:
      'Organizations must demonstrate legitimacy with real-world use cases and transparent structures that align with crypto industry standards.',
  },
  {
    name: 'Active Community Engagement',
    description:
      'Organizations must demonstrate ongoing engagement with their community. A strong, active user base is a key indicator of legitimacy and long-term sustainability.',
  },
  {
    name: 'Security Best Practices',
    description:
      'Your organization must prioritize security, implementing industry-standard practices to safeguard users and assets. Projects that have undergone audits or have security measures in place are preferred.',
  },
  {
    name: 'Transparency in Governance',
    description:
      'Your organization should practice transparent governance, ensuring that decision-making processes are clear and inclusive of all stakeholders.',
  },
];

export const OrgCriteria = () => (
  <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
      <div className="flex flex-col gap-6 px-6 lg:px-0 lg:pr-4 lg:pt-4">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            Who We Work With
          </span>
          <h2 className="bg-gradient-to-r from-white to-secondary bg-clip-text text-4xl font-bold text-transparent">
            Organization Eligibility
          </h2>
        </div>
        <p className="text-lg leading-8 text-white/90">
          We are committed to fostering decentralization and working with
          organizations that align with the ethos of the crypto space. To be
          listed on our platform, your organization must meet the following
          criteria.
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
