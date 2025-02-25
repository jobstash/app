/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@heroui/button";
import { CustomCellRendererProps } from 'ag-grid-react';

import { OrgItem } from '@jobstash/admin/core';

import { useActivateOrgJobsite } from '@jobstash/admin/state';

export const ActivateJobsiteRenderer = (
  props: CustomCellRendererProps<OrgItem>,
) => {
  const { data, node, api } = props;

  const { mutate, isPending } = useActivateOrgJobsite();

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
            const activatedJobsite = data.detectedJobsites[0];
            newItem.jobsites = [...data.jobsites, activatedJobsite];
            newItem.detectedJobsites = data.detectedJobsites.filter(
              (j) => j.id !== activatedJobsite.id,
            );
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
