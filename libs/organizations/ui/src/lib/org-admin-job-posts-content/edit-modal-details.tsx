import { UpdateOrgJobPayload } from '@jobstash/organizations/core';

import { EditModalTextarea } from './edit-modal-textarea';
import { HandleFieldChange } from './types';

interface Props {
  formState: UpdateOrgJobPayload;
  handleFieldChange: HandleFieldChange;
}

export const EditModalDetails = ({ formState, handleFieldChange }: Props) => (
  <>
    <EditModalTextarea
      label="Summary"
      formKey="summary"
      description="A brief overview of the role, highlighting key responsibilities and objectives."
      placeholder="Summarize the main duties and expectations for this position."
      formValue={formState.summary}
      handleFieldChange={handleFieldChange}
    />

    <EditModalTextarea
      label="Description"
      formKey="description"
      description="Detailed information about the role, covering daily responsibilities, required skills, and expectations."
      placeholder="Describe the role's responsibilities, required qualifications, and impact on the team."
      formValue={formState.description}
      handleFieldChange={handleFieldChange}
    />

    <EditModalTextarea
      label="Culture"
      formKey="culture"
      description="Insights into the company's work environment, values, and team dynamics."
      placeholder="Explain what makes the company's culture unique and how this role fits within it."
      formValue={formState.culture}
      handleFieldChange={handleFieldChange}
    />
  </>
);
