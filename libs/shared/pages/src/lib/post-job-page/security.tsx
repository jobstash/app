import { LockClosedIcon } from '@heroicons/react/20/solid';
import { BlendIcon, ShieldIcon } from 'lucide-react';

const features = [
  {
    name: 'Security Concerns',
    description:
      'Allowing anonymous job posts opens the door to potential security risks, including malware and phishing attacks. We prioritize safety by requiring each job to be linked to a verified company.',
    icon: LockClosedIcon,
  },
  {
    name: 'Trust and Transparency',
    description:
      'Candidates need confidence that the jobs they apply for are legitimate. By posting only jobs connected to known organizations, we foster a more transparent and trustworthy job marketplace.',
    icon: BlendIcon,
  },
  {
    name: 'Preventing Fraudulent Listings',
    description:
      'Requiring a company attachment helps us prevent fraudulent or misleading job postings. This ensures that every listing on our platform meets a standard of quality and reliability.',
    icon: ShieldIcon,
  },
];

export const Security = () => (
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
      <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-6xl font-bold text-transparent">
        Verified Organizations Only
      </span>
      <p className="mt-6 text-lg leading-8 text-white/90">
        We are committed to ensuring a safe and trustworthy platform for job
        seekers and organizations alike. To maintain the integrity of our
        listings and protect users from potential threats, we only allow job
        postings from verified companies.
      </p>
    </div>
    <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white/90">
              <feature.icon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-indigo-400"
              />
              {feature.name}
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-white/90">
              <p className="flex-auto">{feature.description}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
);
