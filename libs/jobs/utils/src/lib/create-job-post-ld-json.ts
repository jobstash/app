import { type JobPost } from '@jobstash/jobs/core';
import { EDGE_URL } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

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
  const validThrough = new Date(datePosted.setMonth(datePosted.getMonth() + 3));

  const jsonLd: Record<
    string,
    | string
    | number
    | boolean
    | Record<string, string | number | Record<string, string | number>>
  > = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title,
    description,
    datePosted: datePosted.toISOString(),
    validThrough: validThrough.toISOString(),
    hiringOrganization: {
      '@type': 'Organization',
      name: organization.name,
      logo: getLogoUrl(organization.website, organization.logoUrl),
      sameAs: organization.logoUrl ?? '',
    },
    image: imageMetaData,
    directApply: Boolean(url),
    employerOverview: organization.description,
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
    }

    const locationName = location
      .replaceAll(/remote/gi, '')
      .replaceAll('-', '')
      .replaceAll('or', '')
      .trim();

    jsonLd['applicantLocationRequirements'] = {
      '@type': 'Country',
      name: locationName,
    };

    jsonLd['location'] = {
      '@type': 'Place',
      address: {
        name: locationName,
      },
    };
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
