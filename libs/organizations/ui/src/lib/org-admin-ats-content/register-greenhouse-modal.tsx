import { ATS_PROVIDERS } from '@jobstash/organizations/core';

import { RegisterAtsModal } from './register-ats-modal';

interface Props {
  orgId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export const RegisterGreenhouseModal = (props: Props) => (
  <RegisterAtsModal
    {...props}
    platformName={ATS_PROVIDERS.GREENHOUSE.platformName}
    formFields={[
      {
        name: 'apiToken',
        label: 'API Token',
        description: 'API access tokens from greenhouse',
      },
      {
        name: 'userId',
        label: 'User Id',
        description: 'Your greenhouse user id',
      },
    ]}
    payloadHandler={(formState) => ({
      apiToken: formState.apiToken,
      userId: formState.userId,
    })}
    headerText="Register Greenhouse"
  />
);
