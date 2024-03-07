import { Divider } from '~/shared/components/divider';
import { Heading } from '~/shared/components/heading';
import { Text } from '~/shared/components/text';

import { JobDetails } from '~/jobs/core/schemas';

interface Props {
  job: JobDetails;
}

export const JobDetailsCardDescriptions = ({ job }: Props) => {
  const descriptions = createJobDescriptions(job);

	if (!descriptions.length) return null;

  return (
    <>
		<Divider />
      <div className="flex flex-col gap-6">
        {descriptions.map(({ label, content }) => (
          <div key={label} className="flex flex-col gap-2">
            <Heading
              text={label}
              className="text-base font-semibold"
              htmlTag="h3"
            />
            {typeof content === 'string' ? (
              <Text text={content} />
            ) : (
              <ul className="list-outside list-disc space-y-1 pl-6">
                {content.map((text) => (
                  <Text key={text} text={text} htmlTag="li" />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const createJobDescriptions = (job: JobDetails) => {
  const { description, requirements, responsibilities, benefits, culture } =
    job;
  const descriptions: { label: string; content: string | string[] }[] = [];

  if (description) {
    descriptions.push({ label: 'Description', content: description });
  }

  if (requirements.length > 0) {
    descriptions.push({ label: 'Requirements', content: requirements });
  }

  if (responsibilities.length > 0) {
    descriptions.push({ label: 'Responsibilities', content: responsibilities });
  }

  if (benefits.length > 0) {
    descriptions.push({ label: 'Benefits', content: benefits });
  }

  if (culture) {
    descriptions.push({ label: 'Culture', content: culture });
  }

  return descriptions;
};
