/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@nextui-org/button';
import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgItem } from '@jobstash/admin/core';

import { useActivateJobsite } from './use-activate-jobsite';

export const ActivateJobsiteRenderer = (
  props: CustomCellRendererProps<OrgItem>,
) => {
  const { data, node, api } = props;

  const { mutate, isPending } = useActivateJobsite();

  const isNotApplicable =
    (data?.detectedJobsites ?? []).flatMap((j) => j.url).filter(Boolean)
      .length === 0 || (data?.jobsites ?? []).length > 0;

  const onClick = () => {
    const orgId = data?.orgId;
    const jobsiteIds = (data?.detectedJobsites ?? []).flatMap((j) => j.id);
    if (orgId && jobsiteIds.length > 0) {
      mutate(
        { orgId, jobsiteIds },
        {
          onSuccess() {
            const newItem = copyObject(node.data) as OrgItem;
            newItem.jobsites = [data.detectedJobsites[0]];
            api.applyTransaction({
              update: [newItem],
            });
          },
        },
      );
    }
  };

  return (
    <div className="w-full flex justify-center h-[50px] items-center">
      {isNotApplicable ? (
        <p className="text-white/40">---</p>
      ) : (
        <Button size="sm" isLoading={isPending} onClick={onClick}>
          Activate
        </Button>
      )}
    </div>
  );
};

const copyObject = (object: any) => {
  const newObject: any = {};
  for (const key of Object.keys(object)) {
    newObject[key] = object[key];
  }

  return newObject;
};
