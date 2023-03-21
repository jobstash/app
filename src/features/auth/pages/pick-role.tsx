import { SideBar, Text } from '~/shared/components';

import { PickRoleButton, PickRoleSection } from '../components';

export const PickRolePage = () => (
  <div className="w-full pl-52">
    <SideBar />

    <div className="flex h-screen pl-4 [&>*]:w-full">
      {/* DEV SECTION */}
      <PickRoleSection className="bg-gradient-to-l from-primary to-secondary">
        <Text size="lg" fw="bold">
          Developer
        </Text>
        <div className="flex w-72 flex-col gap-y-6">
          <Text color="dimmed" size="sm">
            To create an account we need to validate your Github account(s).
          </Text>
          <Text color="dimmed" size="sm">
            We will then verify you own the the account, and will inspect which
            public commits you have made in the past.
          </Text>
        </div>

        <PickRoleButton text="Connect with Github" icon="github" />

        <hr className="border-t border-white/10" />
      </PickRoleSection>

      {/* ORG SECTION */}
      <PickRoleSection>
        <Text size="lg" fw="bold">
          Organization
        </Text>
        <div className="flex w-72">
          <Text color="dimmed" size="sm">
            We need to verify you are part of an organisation to let you sign
            in. We support Github and email validation for this. Please pick one
            of the two.
          </Text>
        </div>

        <PickRoleButton text="Connect with Organization Email" icon="email" />

        <hr className="border-t border-white/10" />

        <PickRoleButton text="Connect with Github" icon="github" />
      </PickRoleSection>
    </div>
  </div>
);
