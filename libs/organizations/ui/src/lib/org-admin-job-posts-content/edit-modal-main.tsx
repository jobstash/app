import { useAtomValue } from 'jotai';

import { UpdateOrgJobPayload } from '@jobstash/organizations/core';

import { EDIT_ACTIVE_TABS, editActiveTabAtom } from './atoms';
import { EditModalSelectInput } from './edit-modal-select-input';
import { EditModalSwitch } from './edit-modal-switch';
import { EditModalTextInput } from './edit-modal-text-input';
import { HandleFieldChange } from './types';

const CLASSIFICATION_OPTIONS = [
  { label: 'Human Resources', value: 'HUMAN_RESOURCES' },
  { label: 'Bizdev', value: 'BIZDEV' },
  { label: 'Operations', value: 'OPERATIONS' },
  { label: 'Management', value: 'MANAGEMENT' },
  { label: 'Product', value: 'PRODUCT' },
  { label: 'Community', value: 'COMMUNITY' },
  { label: 'Finance', value: 'FINANCE' },
  { label: 'Legal', value: 'LEGAL' },
  { label: 'Design', value: 'DESIGN' },
  { label: 'Marketing', value: 'MARKETING' },
  { label: 'Devrel', value: 'DEVREL' },
  { label: 'Events', value: 'EVENTS' },
  { label: 'Growth', value: 'GROWTH' },
  { label: 'Devops', value: 'DEVOPS' },
  { label: 'Customer Support', value: 'CUSTOMER_SUPPORT' },
  { label: 'Cybersecurity', value: 'CYBERSECURITY' },
  { label: 'Partnerships', value: 'PARTNERSHIPS' },
  { label: 'Other', value: 'OTHER' },
  { label: 'Technical Writing', value: 'TECHNICAL_WRITING' },
  { label: 'People', value: 'PEOPLE' },
  { label: 'Sales', value: 'SALES' },
  { label: 'Accounting', value: 'ACCOUNTING' },
  { label: 'Research', value: 'RESEARCH' },
  { label: 'Engineering', value: 'ENGINEERING' },
  { label: 'Data Science', value: 'DATA_SCIENCE' },
];

const LOCATION_TYPE_OPTIONS = [
  { label: 'Onsite', value: 'ONSITE' },
  { label: 'Remote', value: 'REMOTE' },
  { label: 'Hybrid', value: 'HYBRID' },
];

const SENIORITY_OPTIONS = [
  { label: 'Intern', value: '1' },
  { label: 'Junior', value: '2' },
  { label: 'Senior', value: '3' },
  { label: 'Lead', value: '4' },
  { label: 'Head', value: '5' },
];

const COMMITMENT_OPTIONS = [
  { label: 'Full Time', value: 'FULL_TIME' },
  { label: 'Part Time', value: 'PART_TIME' },
  { label: 'Contract', value: 'CONTRACT' },
  { label: 'Internship', value: 'INTERNSHIP' },
];

const GROUPED_CLASSNAME = 'flex gap-4 [&>*]:w-1/2 items-center';

interface Props {
  formState: UpdateOrgJobPayload;
  handleFieldChange: HandleFieldChange;
  isPending: boolean;
}

export const EditModalMain = ({
  formState,
  handleFieldChange,
  isPending,
}: Props) => {
  const activeTab = useAtomValue(editActiveTabAtom);

  if (activeTab !== EDIT_ACTIVE_TABS.MAIN) return null;

  return (
    <>
      <EditModalTextInput
        label="Title"
        formKey="title"
        description="The official title for the position, such as 'Software Engineer' or 'Marketing Manager.'"
        placeholder="Senior Software Developer"
        formValue={formState.title}
        handleFieldChange={handleFieldChange}
        isDisabled={isPending}
      />

      <div className={GROUPED_CLASSNAME}>
        <EditModalTextInput
          label="Apply URL"
          formKey="url"
          description="The job application page for this position."
          placeholder="https://companysite.com"
          formValue={formState.url}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
        <EditModalSelectInput
          label="Classification"
          formKey="classification"
          description="The primary function or department the role belongs."
          placeholder="Engineering"
          formValue={formState.classification}
          options={CLASSIFICATION_OPTIONS}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
      </div>
      <div className={GROUPED_CLASSNAME}>
        <EditModalTextInput
          label="Location"
          formKey="location"
          description="The physical location for the role, such as city and state, or remote."
          placeholder="San Francisco, CA"
          formValue={formState.location}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
        <EditModalSelectInput
          label="Location Type"
          formKey="locationType"
          description="Specifies if the role is fully remote, onsite, or a hybrid setup."
          placeholder="Remote"
          formValue={formState.locationType}
          options={LOCATION_TYPE_OPTIONS}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
      </div>
      <div className={GROUPED_CLASSNAME}>
        <EditModalSelectInput
          label="Seniority"
          formKey="seniority"
          description="Indicates the required experience level for the role."
          placeholder="Lead"
          formValue={formState.seniority}
          options={SENIORITY_OPTIONS}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
        <EditModalSelectInput
          label="Commitment"
          formKey="commitment"
          description="The employment type or duration, such as full-time, part-time, or contract."
          placeholder="Full Time"
          formValue={formState.commitment}
          options={COMMITMENT_OPTIONS}
          handleFieldChange={handleFieldChange}
          isDisabled={isPending}
        />
      </div>

      <div className="w-1/2">
        <EditModalSwitch
          title="Block Job Post"
          subtitle="Restrict access to this job post and flag it as malicious"
          isSelected={Boolean(formState.paysInCrypto)}
          isDisabled={isPending}
          onValueChange={(value) => handleFieldChange('paysInCrypto', value)}
        />
      </div>
    </>
  );
};
