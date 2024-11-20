import { useMemo } from 'react';

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
} from '@nextui-org/react';
import { useAtom } from 'jotai';

import { getLogoUrl, prettyTimestamp } from '@jobstash/shared/utils';

import {
  jobBookmarkAtom,
  useAllJobFolders,
  useSavedJobs,
  useUpdateJobFolder,
  useUpdateSavedJobs,
} from '@jobstash/jobs/state';
import { useIsDesktop } from '@jobstash/shared/state';

import { Heading, Text } from '@jobstash/shared/ui';

import { BookmarkListCheckBox } from './bookmark-list-checkbox';
import { NewListForm } from './new-list-form';

export const JobBookmarkModal = () => {
  const isDesktop = useIsDesktop();

  const [{ isOpen, jobPost, showNewListForm }, setJobBookmarkState] =
    useAtom(jobBookmarkAtom);

  const toggleContent = () => {
    setJobBookmarkState((prev) => ({
      ...prev,
      showNewListForm: !prev.showNewListForm,
    }));
  };

  const { isLoading: isLoadingSavedJobs, data: savedJobs } = useSavedJobs();
  const { isLoading: isLoadingJobFolders, data: jobFolders } =
    useAllJobFolders();

  const isSavedJob = savedJobs?.some(
    (job) => job.shortUUID === jobPost?.shortUUID,
  );

  const onOpenChange = (open: boolean) => {
    setJobBookmarkState((prev) => ({
      ...prev,
      isOpen: open,
      jobPost: open ? prev.jobPost : null,
      showNewListForm: false,
    }));
  };

  const options = useMemo(() => {
    if (isLoadingSavedJobs || isLoadingJobFolders) {
      return [];
    }

    return (
      jobFolders?.data.map((folder) => ({
        id: folder.id,
        label: folder.name,
        isPublic: folder.isPublic,
        itemCount: folder.jobs.length,
      })) ?? []
    );
  }, [isLoadingJobFolders, isLoadingSavedJobs, jobFolders?.data]);

  const listIds = useMemo(() => {
    if (!jobPost) {
      return [];
    }

    const result = [];

    if (isSavedJob) {
      result.push('saved-jobs');
    }

    if (jobFolders) {
      result.push(
        ...jobFolders.data
          .filter((folder) =>
            folder.jobs.some((job) => job.shortUUID === jobPost.shortUUID),
          )
          .map((folder) => folder.id),
      );
    }

    return result;
  }, [isSavedJob, jobFolders, jobPost]);

  const { isPending: isPendingUpdateSavedJobs, mutate: updateSavedJobs } =
    useUpdateSavedJobs();

  const { isPending: isPendingUpdateJobFolder, mutate: updateJobFolder } =
    useUpdateJobFolder();

  const onUpdateSavedJobs = (isChecked: boolean) => {
    if (jobPost) {
      const shouldDelete = !isChecked;
      updateSavedJobs({ shortUUID: jobPost.shortUUID, shouldDelete });
    }
  };

  const onUpdateJobFolder = (id: string, isChecked: boolean) => {
    const folder = jobFolders?.data.find((f) => f.id === id);

    if (!folder || !jobPost) return;

    const shouldRemoveBookmark = !isChecked;
    const { name, jobs, isPublic } = folder;
    const jobIds = jobs.map((j) => j.shortUUID);

    const updatedJobs = shouldRemoveBookmark
      ? jobIds.filter((jobId) => jobId !== jobPost.shortUUID)
      : [...jobIds, jobPost.shortUUID];

    updateJobFolder({
      id,
      payload: {
        name,
        isPublic,
        jobs: updatedJobs,
      },
    });
  };

  const isDisabled = isPendingUpdateSavedJobs || isPendingUpdateJobFolder;

  if (!jobPost) return null;

  return (
    <Modal
      isDismissable
      hideCloseButton
      isOpen={isOpen}
      backdrop="blur"
      size="lg"
      className="p-4 z-50"
      placement={!isDesktop && showNewListForm ? 'top' : 'auto'}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="flex flex-col gap-y-2">
        <ModalHeader>
          <div className="flex gap-3 items-center">
            <Avatar
              className="h-12 w-12"
              name={jobPost.organization.name}
              src={getLogoUrl(
                jobPost.organization.website ?? '',
                jobPost.organization.logoUrl,
              )}
            />
            <div className="flex flex-col">
              <Heading size="md">{jobPost.title}</Heading>
              <Text size="md" className="text-white/80">
                {jobPost.organization.name} |{' '}
                {prettyTimestamp(jobPost.timestamp)}
              </Text>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="ml-2">
          {showNewListForm ? (
            <NewListForm
              toggleContent={toggleContent}
              currentJobId={jobPost.shortUUID}
            />
          ) : (
            <>
              <Text className="text-white/90" size="lg">
                Choose bookmark folder:
              </Text>
              <ScrollShadow size={20} className="w-full h-[320px] pr-4">
                <BookmarkListCheckBox
                  label="Saved Jobs"
                  isPublic={false}
                  itemCount={savedJobs?.length ?? 0}
                  isDisabled={isDisabled}
                  isSelected={listIds.includes('saved-jobs')}
                  onValueChange={onUpdateSavedJobs}
                />

                {options.map(({ id, label, isPublic, itemCount }) => (
                  <BookmarkListCheckBox
                    key={id}
                    label={label}
                    isPublic={isPublic}
                    itemCount={itemCount}
                    isDisabled={isDisabled}
                    isSelected={listIds.includes(id)}
                    onValueChange={(isChecked) =>
                      onUpdateJobFolder(id, isChecked)
                    }
                  />
                ))}
              </ScrollShadow>
              <Button fullWidth isDisabled={isDisabled} onClick={toggleContent}>
                Add New List
              </Button>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
