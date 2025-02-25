/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@heroui/button";
import { CustomCellRendererProps } from 'ag-grid-react';

import { ProjectItem } from '@jobstash/admin/core';

import { useActivateProjectJobsite } from '@jobstash/admin/state';

export const ActivateJobsiteRenderer = (
  props: CustomCellRendererProps<ProjectItem>,
) => {
  const { data, node, api } = props;

  const { mutate, isPending } = useActivateProjectJobsite();

  const isNotApplicable =
    (data?.detectedJobsites ?? []).flatMap((j) => j.url).filter(Boolean)
      .length === 0 || (data?.jobsites ?? []).length > 0;

  const onClick = () => {
    const projectId = data?.id;
    const jobsiteIds = (data?.detectedJobsites ?? []).flatMap((j) => j.id);
    if (projectId && jobsiteIds.length > 0) {
      mutate(
        { id: projectId, jobsiteIds },
        {
          onSuccess() {
            const newItem = copyObject(node.data) as ProjectItem;
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
