import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Spinner,
  Textarea,
} from '@nextui-org/react';

import { OrgDetails } from '@jobstash/organizations/core';

import { useOrgDetails } from '@jobstash/organizations/state';

import { useManagedOrgForm } from '../hooks/use-managed-org-form';

interface Props {
  org: OrgDetails;
}

interface OrgField {
  label: string;
  value: string;
  placeholder?: string;
  isTextarea?: boolean;
  onChange: (value: string) => void;
}

const OrgInputField = ({
  label,
  value,
  placeholder = 'N/A',
  isTextarea = false,
  onChange,
}: OrgField) =>
  isTextarea ? (
    <Textarea
      label={label}
      placeholder={placeholder}
      value={value}
      variant="bordered"
      radius="sm"
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <Input
      label={label}
      placeholder={placeholder}
      value={value}
      variant="bordered"
      radius="sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );

export const OrgInfo = ({ org }: Props) => {
  const { data } = useOrgDetails(org.orgId);
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [isDisabled, setIsDisabled] = useState(true);

  useManagedOrgForm(org.orgId);

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name || '',
        website: data.website || '',
        location: data.location || '',
        logoUrl: data.logoUrl || '',
        summary: data.summary || '',
        description: data.description || '',
        headcountEstimate: data.headcountEstimate?.toString() || '',
        discord: data.discord || '',
        telegram: data.telegram || '',
        github: data.github || '',
        docs: data.docs || '',
        twitter: data.twitter || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const hasChanges = Object.keys(formState).some(
        (key) =>
          formState[key].trim() !==
          (data[key as keyof typeof data]?.toString().trim() ?? ''),
      );
      setIsDisabled(!hasChanges);
    }
  }, [formState, data]);

  if (!data) {
    return (
      <div className="w-80 h-40 flex items-center justify-center">
        <Spinner size="lg" color="white" />
      </div>
    );
  }

  const accordionData = [
    {
      key: 'info',
      title: 'Info',
      fields: [
        { label: 'Name', key: 'name', value: formState.name },
        { label: 'Website', key: 'website', value: formState.website },
        { label: 'Location', key: 'location', value: formState.location },
        { label: 'Logo Url', key: 'logoUrl', value: formState.logoUrl },
        {
          label: 'Summary',
          key: 'summary',
          value: formState.summary,
          isTextarea: true,
        },
        {
          label: 'Description',
          key: 'description',
          value: formState.description,
          isTextarea: true,
        },
        {
          label: 'Employees',
          key: 'headcountEstimate',
          value: formState.headcountEstimate,
        },
      ],
    },
    {
      key: 'socials',
      title: 'Socials',
      fields: [
        { label: 'Discord', key: 'discord', value: formState.discord },
        { label: 'Telegram', key: 'telegram', value: formState.telegram },
        { label: 'Github', key: 'github', value: formState.github },
        { label: 'Docs', key: 'docs', value: formState.docs },
        { label: 'Twitter', key: 'twitter', value: formState.twitter },
      ],
    },
  ];

  const handleFieldChange = (key: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (Number(formState.headcountEstimate))
      console.log('Saving changes...', formState);
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg pb-40">
      <Accordion variant="splitted">
        {accordionData.map(({ key, title, fields }) => (
          <AccordionItem key={key} title={title} aria-label={`Org ${title}`}>
            <div className="flex flex-col gap-4">
              {fields.map(({ label, value, key: fieldKey, isTextarea }) => (
                <OrgInputField
                  key={fieldKey}
                  label={label}
                  value={value}
                  isTextarea={isTextarea}
                  onChange={(newValue) => handleFieldChange(fieldKey, newValue)}
                />
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        isDisabled={isDisabled}
        radius="sm"
        className="font-bold w-fit"
        onPress={handleSave}
      >
        Save Changes
      </Button>
    </div>
  );
};
