import { type JobPost } from '@jobstash/jobs/core';
import { NEXT_PUBLIC_EDGE_URL } from '@jobstash/shared/core';

export const createJobPostLdJson = (jobPost?: JobPost) => {
  if (jobPost) {
    const {
      organization,
      technologies,
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

    const imageMetaData = `${NEXT_PUBLIC_EDGE_URL}/jobs/job-card?id=${shortUUID}`;

    let description = `<p>Role</p>\n\n<p>${role}</p>\n\n`;
    if (team) {
      description += `<p>Team</p>\n\n<p>${team}</p>\n\n`;
    }

    if (culture) {
      description += `<p>Culture</p>\n\n<p>${culture}</p>\n\n`;
    }

    if (technologies.length > 0) {
      description += '<p>Technologies:</p>\n\n<ul>';
      for (const tech of technologies.map((t) => t.name)) {
        description += `<li>${tech}</li>`;
      }

      description += '</ul>\n\n';
    }

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
      datePosted: new Date(jobCreatedTimestamp).toISOString(),
      hiringOrganization: {
        '@type': 'Organization',
        name: organization.name,
        logo: imageMetaData,
        sameAs: organization.url,
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

    if (technologies.length > 0) {
      jsonLd['skills'] = technologies.map((t) => t.name).join(', ');
    }

    return {
      __html: JSON.stringify(jsonLd),
    };
  }

  return {
    __html: '',
  };
};
