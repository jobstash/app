import { type JobPost } from '@jobstash/jobs/core';
import { EDGE_URL } from '@jobstash/shared/core';
import { getLogoUrl } from '@jobstash/shared/utils';

export const createJobPostLdJson = (jobPost?: JobPost) => {
  if (jobPost) {
    const {
      organization,
      tags,
      role,
      team,
      culture,
      benefits,
      jobTitle,
      jobCreatedTimestamp,
      jobApplyPageUrl,
      jobCommitment,
      jobLocation,
      minSalaryRange,
      maxSalaryRange,
      shortUUID,
    } = jobPost;

    const imageMetaData = `${EDGE_URL}/jobs/job-card?id=${shortUUID}`;

    let description = `<p>Role</p>\n\n<p>${role}</p>\n\n`;
    if (team) {
      description += `<p>Team</p>\n\n<p>${team}</p>\n\n`;
    }

    if (culture) {
      description += `<p>Culture</p>\n\n<p>${culture}</p>\n\n`;
    }

    if (tags.length > 0) {
      description += '<p>Tags:</p>\n\n<ul>';
      for (const tech of tags.map((t) => t.name)) {
        description += `<li>${tech}</li>`;
      }

      description += '</ul>\n\n';
    }

    const datePosted = new Date(jobCreatedTimestamp);
    const validThrough = new Date(
      datePosted.setMonth(datePosted.getMonth() + 3),
    );

    const jsonLd: Record<
      string,
      | string
      | number
      | boolean
      | Record<string, string | number | Record<string, string | number>>
    > = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: jobTitle,
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
      directApply: Boolean(jobApplyPageUrl),
      employerOverview: organization.description,
      employmentType: jobCommitment ? jobCommitment.toUpperCase() : 'FULL_TIME',
    };

    if (role) {
      jsonLd['responsibilities'] = role;
    }

    if (jobLocation) {
      const isRemote = jobLocation.toLowerCase().includes('remote');
      if (isRemote) {
        jsonLd['jobLocationType'] = 'TELECOMMUTE';
      }

      const locationName = jobLocation
        .replaceAll(/remote/gi, '')
        .replaceAll('-', '')
        .replaceAll('or', '')
        .trim();

      jsonLd['applicantLocationRequirements'] = {
        '@type': 'Country',
        name: locationName,
      };

      jsonLd['jobLocation'] = {
        '@type': 'Place',
        address: {
          name: locationName,
        },
      };
    }

    if (minSalaryRange && maxSalaryRange) {
      jsonLd['baseSalary'] = {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: {
          '@type': 'QuantitativeValue',
          minValue: minSalaryRange,
          maxValue: maxSalaryRange,
          unitText: 'YEAR',
        },
      };
    }

    if (benefits) {
      jsonLd['jobBenefits'] = benefits;
    }

    if (tags.length > 0) {
      jsonLd['skills'] = tags.map((t) => t.name).join(', ');
    }

    return {
      __html: JSON.stringify(jsonLd),
    };
  }

  return {
    __html: '',
  };
};
