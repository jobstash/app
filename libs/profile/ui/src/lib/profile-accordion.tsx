import { Accordion, AccordionItem } from '@nextui-org/react';

import { Heading } from '@jobstash/shared/ui';

const SHOWCASE_TITLE = 'Resume, Portfolio & More';
const SKILLS_TITLE = 'Your Skills';

interface Props {
  showcase: React.ReactNode;
  skills: React.ReactNode;
}

export const ProfileAccordion = (props: Props) => {
  const { showcase, skills } = props;
  return (
    <Accordion
      keepContentMounted
      variant="splitted"
      selectionMode="multiple"
      defaultExpandedKeys={['contact', 'skills', 'showcase']}
      className="gap-4 p-0"
    >
      <AccordionItem
        key="skills"
        textValue={SHOWCASE_TITLE}
        title={<Heading size="md">{SHOWCASE_TITLE}</Heading>}
      >
        {showcase}
      </AccordionItem>
      <AccordionItem
        key="showcase"
        textValue={SKILLS_TITLE}
        title={<Heading size="md">{SKILLS_TITLE}</Heading>}
      >
        {skills}
      </AccordionItem>
    </Accordion>
  );
};
