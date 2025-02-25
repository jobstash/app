import { Button } from "@heroui/button";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIcon, Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { UpdateJobFolderPayload } from '@jobstash/jobs/core';
import { FRONTEND_URL } from '@jobstash/shared/core';
import { normalizeString, sonnerToast } from '@jobstash/shared/utils';

import { useMwVersionContext } from '@jobstash/shared/state';
import { updateJobFolder } from '@jobstash/jobs/data';

const LOADING_TOAST_ID = 'update-saved-jobs-toast-loading';
const TOAST_ID = 'update-saved-jobs-toast';

interface MutationPayload {
  id: string;
  payload: UpdateJobFolderPayload;
}

export const useUpdateJobFolder = () => {
  const queryClient = useQueryClient();
  const { mwVersion } = useMwVersionContext();

  return useMutation({
    mutationFn: ({ id, payload }: MutationPayload) =>
      updateJobFolder(id, payload),
    onMutate() {
      toast.dismiss(TOAST_ID);
      sonnerToast({
        id: LOADING_TOAST_ID,
        isPending: true,
        title: 'Updating Bookmark Folder',
        message: 'Please wait ...',
      });
    },
    async onSuccess(_data, { id, payload: { name } }) {
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders'],
      });
      await queryClient.invalidateQueries({
        queryKey: [mwVersion, 'job-folders', id],
      });

      toast.dismiss(LOADING_TOAST_ID);
      sonnerToast({
        id: TOAST_ID,
        title: `Bookmark List Updated!`,
        message: `Bookmark list has been updated.`,
        cta: () => (
          <Button
            size="sm"
            startContent={<Share2Icon size={14} />}
            onClick={() =>
              copyToClipboard(
                `${FRONTEND_URL}/bookmarks/jobs/${normalizeString(name)}`,
              )
            }
          >
            Share
          </Button>
        ),
      });
    },
    onError(error) {
      toast.dismiss(LOADING_TOAST_ID);
      sonnerToast({
        id: TOAST_ID,
        title: 'Something went wrong :(',
        message: (error as Error).message,
      });
    },
  });
};

const copyToClipboard = (slug: string) => {
  if (navigator) {
    navigator.clipboard.writeText(slug);
  }

  sonnerToast({
    title: 'Copied to clipboard!',
    message: 'Paste to share the bookmark list',
    duration: 4000,
    cta: (t) => (
      <Button
        size="sm"
        startContent={<CheckIcon size={14} />}
        onClick={() => toast.dismiss(t)}
      >
        Got It
      </Button>
    ),
    withCloseButton: false,
  });
};
