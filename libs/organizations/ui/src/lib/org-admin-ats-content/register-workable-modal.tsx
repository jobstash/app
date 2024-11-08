import { ATS_PROVIDERS } from '@jobstash/organizations/core';
import { getWebsiteText } from '@jobstash/shared/utils';

import { RegisterAtsModal } from './register-ats-modal';

interface Props {
  orgId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const RegisterWorkableModal = (props: Props) => (
  <RegisterAtsModal
    {...props}
    platformName={ATS_PROVIDERS.WORKABLE.platformName}
    formFields={[
      {
        name: 'apiToken',
        label: 'API Token',
        description: 'API access tokens from workable',
      },
      {
        name: 'workableUrl',
        label: 'Workable URL',
        description: 'e.g. "jobstash.workable.com"',
      },
    ]}
    payloadHandler={(formState) => ({
      apiToken: formState.apiToken,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workableUrl: getWebsiteText(formState.workableUrl!).link,
    })}
    headerText="Register Workable"
  />
);
