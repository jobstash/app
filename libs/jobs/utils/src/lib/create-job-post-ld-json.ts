/* eslint-disable complexity */
import { EDGE_URL, JobPost } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

import { getJobLogoTitleProps } from './get-job-logo-title-props';

const getTextSectionString = (title: string, text: string) =>
  `<div><h3>${title}</h3><p>${text}</p></div>`;

const getListSectionString = (title: string, items: string[]) =>
  `<div><h3>${title}</h3><ul>${items
    .map((item) => `<li>${item}</li>`)
    .join('')}</ul></div>`;

export const createJobPostLdJson = (jobPost: JobPost) => {
  const {
    organization,
    tags,
    summary,
    requirements,
    responsibilities,
    benefits,
    culture,
    title,
    timestamp,
    url,
    commitment,
    location,
    locationType,
    minimumSalary,
    maximumSalary,
    salary,
    shortUUID,
    salaryCurrency,
    project,
  } = jobPost;

  const imageMetaData = `${EDGE_URL}/jobs/job-card?id=${shortUUID}`;

  let description = '';

  if (summary) {
    description += getTextSectionString('Summary', summary);
  }

  if (requirements.length > 0) {
    description += getListSectionString('Requirements', requirements);
  }

  if (responsibilities.length > 0) {
    description += getListSectionString('Responsibilities', responsibilities);
  }

  if (benefits.length > 0) {
    description += getListSectionString('Benefits', benefits);
  }

  if (culture) {
    description += getTextSectionString('Culture', culture);
  }

  if (tags.length > 0) {
    description += getListSectionString(
      'Tags',
      tags.map((t) => t.name),
    );
  }

  const datePosted = new Date(timestamp);
  const validThrough = new Date(timestamp);
  validThrough.setMonth(validThrough.getMonth() + 1);

  const { name, logo, website } = getJobLogoTitleProps(jobPost);

  const jsonLd: Record<
    string,
    | string
    | number
    | boolean
    | Record<string, string | number | Record<string, string | number>>
    | { '@type': string; name: string }[]
  > = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title,
    description,
    datePosted: datePosted.toISOString(),
    validThrough: validThrough.toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: name ?? '',
      logo: getLogoUrl(website ?? '', logo),
      sameAs: name ?? '',
    },
    image: imageMetaData,
    directApply: Boolean(url),
    employerOverview: organization?.description ?? project?.description ?? '',
    employmentType: commitment ? commitment.toUpperCase() : 'FULL_TIME',
  };

  if (requirements.length > 0) {
    jsonLd['qualifications'] = requirements.join(',');
  }

  if (responsibilities.length > 0) {
    jsonLd['responsibilities'] = responsibilities.join(',');
  }

  if (benefits.length > 0) {
    jsonLd['benefits'] = benefits.join(',');
  }

  if (location) {
    const isRemote = locationType?.toLowerCase().includes('remote');
    if (isRemote) {
      jsonLd['locationType'] = 'TELECOMMUTE';
      jsonLd['applicantLocationRequirements'] = REMOTE_LOCATIONS;
    }

    const locationName = location
      .replaceAll(/remote/gi, '')
      .replaceAll('-', '')
      .replaceAll('or', '')
      .trim();

    if (!isRemote && locationName) {
      // TODO: implement `JobLocation` interface for fixed-location jobs
      /*
			interface JobLocation {
				addressLocality: string; // Required: City
				addressRegion: string; // Required: State/Province/Region
				addressCountry: string; // Required: Country
				streetAddress?: string; // Optional: Full street address
				postalCode?: string; // Optional: ZIP/Postal code
			}
			*/
      jsonLd['applicantLocationRequirements'] = {
        '@type': 'Country',
        name: locationName,
      };
    }
  }

  if (minimumSalary && maximumSalary) {
    const estimatedSalary =
      salary ?? (maximumSalary - minimumSalary) / 2 + minimumSalary;
    const currency = salaryCurrency ?? 'USD';
    const monetaryAmount = {
      '@type': 'MonetaryAmount',
      currency,
      value: {
        '@type': 'QuantitativeValue',
        minValue: minimumSalary,
        maxValue: maximumSalary,
        unitText: 'YEAR',
        value: estimatedSalary,
      },
    };
    jsonLd['baseSalary'] = monetaryAmount;
    jsonLd['estimatedSalary'] = monetaryAmount;
  }

  if (tags.length > 0) {
    jsonLd['skills'] = tags.map((t) => t.name).join(', ');
  }

  return {
    __html: JSON.stringify(jsonLd),
  };
};

const REMOTE_LOCATIONS = [
  // EU
  { '@type': 'Country', name: 'DE' }, // Germany
  { '@type': 'Country', name: 'ES' }, // Spain
  { '@type': 'Country', name: 'PT' }, // Portugal
  { '@type': 'Country', name: 'HR' }, // Croatia
  { '@type': 'Country', name: 'IT' }, // Italy
  { '@type': 'Country', name: 'RO' }, // Romania
  { '@type': 'Country', name: 'PL' }, // Poland

  // United States
  { '@type': 'Country', name: 'US' }, // United States

  // Latin American
  { '@type': 'Country', name: 'AR' }, // Argentina
  { '@type': 'Country', name: 'BR' }, // Brazil
  { '@type': 'Country', name: 'CO' }, // Colombia
  { '@type': 'Country', name: 'MX' }, // Mexico

  // Africa
  { '@type': 'Country', name: 'NG' }, // Nigeria
  { '@type': 'Country', name: 'ZA' }, // South Africa

  // Middle East
  { '@type': 'Country', name: 'AE' }, // United Arab Emirates

  // Southeast Asia & East Asia
  { '@type': 'Country', name: 'PH' }, // Philippines
  { '@type': 'Country', name: 'ID' }, // Indonesia
  { '@type': 'Country', name: 'TW' }, // Taiwan
  { '@type': 'Country', name: 'IN' }, // India
  { '@type': 'Country', name: 'LK' }, // Sri Lanka
  { '@type': 'Country', name: 'MY' }, // Malaysia
  { '@type': 'Country', name: 'SG' }, // Singapore
  { '@type': 'Country', name: 'HK' }, // Hong Kong
];
