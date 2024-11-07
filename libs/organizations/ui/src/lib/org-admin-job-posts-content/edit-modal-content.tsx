import { useCallback, useMemo, useRef, useState } from 'react';

import { Button } from '@nextui-org/react';
import { useAtom, useSetAtom } from 'jotai';

import { OrgJobItem, UpdateOrgJobPayload } from '@jobstash/organizations/core';
import {
  dataToOrgJobPayload,
  sanitizeOrgJobPayload,
} from '@jobstash/organizations/utils';
import { notifError } from '@jobstash/shared/utils';

import { useUpdateOrgJob } from '@jobstash/organizations/state';

import {
  EDIT_ACTIVE_TABS,
  EditActiveTab,
  editActiveTabAtom,
  editModalAtom,
} from './atoms';
import { EditModalCompensation } from './edit-modal-compensation';
import { EditModalDetails } from './edit-modal-details';
import { EditModalMain } from './edit-modal-main';
import { EditModalSpecifications } from './edit-modal-specifications';

interface Props {
  orgJob: OrgJobItem;
}

export const EditModalContent = ({ orgJob }: Props) => {
  const [activeTab, setActiveTab] = useAtom(editActiveTabAtom);
  const setEditModal = useSetAtom(editModalAtom);

  const initFormStateRef = useRef(dataToOrgJobPayload(orgJob));
  const [formState, setFormState] = useState<UpdateOrgJobPayload>(
    dataToOrgJobPayload(orgJob),
  );

  const hasChanges =
    JSON.stringify(sanitizeOrgJobPayload(initFormStateRef.current)) !==
    JSON.stringify(sanitizeOrgJobPayload(formState));

  const handleFieldChange = useCallback(
    (
      key: keyof UpdateOrgJobPayload,
      value: UpdateOrgJobPayload[keyof UpdateOrgJobPayload],
    ) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    [],
  );

  const { mutate, isPending } = useUpdateOrgJob(orgJob.shortUUID);

  const onSubmit = () => {
    const hasMinimumSalary = formState.minimumSalary !== null;
    const hasMaximumSalary = formState.maximumSalary !== null;
    if (
      hasMinimumSalary &&
      hasMaximumSalary &&
      (formState.minimumSalary || 0) > (formState.maximumSalary || 0)
    ) {
      notifError({
        title: 'Invalid Salary Range',
        message: 'Minimum salary cannot be greater than maximum salary',
      });
      return;
    }

    mutate(sanitizeOrgJobPayload(formState));
  };

  const onClose = () => {
    setEditModal({ isOpen: false, orgJob: null });
    setActiveTab(EDIT_ACTIVE_TABS.MAIN);
  };

  const contentMap: Record<EditActiveTab, JSX.Element> = useMemo(
    () => ({
      [EDIT_ACTIVE_TABS.MAIN]: (
        <EditModalMain
          formState={formState}
          handleFieldChange={handleFieldChange}
          isPending={isPending}
        />
      ),
      [EDIT_ACTIVE_TABS.DETAILS]: (
        <EditModalDetails
          formState={formState}
          handleFieldChange={handleFieldChange}
          isPending={isPending}
        />
      ),
      [EDIT_ACTIVE_TABS.COMPENSATION]: (
        <EditModalCompensation
          formState={formState}
          handleFieldChange={handleFieldChange}
          isPending={isPending}
        />
      ),
      [EDIT_ACTIVE_TABS.SPECIFICATIONS]: (
        <EditModalSpecifications
          formState={formState}
          handleFieldChange={handleFieldChange}
          isPending={isPending}
        />
      ),
      // [EDIT_ACTIVE_TABS.SKILLS]: (
      //   <EditModalSkills
      //     formState={formState}
      //     handleFieldChange={handleFieldChange}
      //   />
      // ),
    }),
    [formState, handleFieldChange, isPending],
  );

  const content = contentMap[activeTab];

  return (
    <div className="px-8 py-8 flex flex-col gap-4">
      {content}

      <div className="pt-4 flex gap-4">
        <Button isDisabled={!hasChanges || isPending} onClick={onSubmit}>
          Save Changes
        </Button>
        <Button isDisabled={isPending} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
