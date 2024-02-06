import { Modal } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';

import { ERR_INTERNAL } from '@jobstash/shared/core';
import { notifError, notifSuccess } from '@jobstash/shared/utils';

import { useReportModal } from '@jobstash/shared/state';

import Heading from '../../base/heading';
import Spinner from '../spinner';

import ReportModalForm from './form';

const title = 'Report Issue';
const ReportModal = () => {
  const { isOpen, close, ctx } = useReportModal();

  const { isLoading, mutate } = useMutation({
    async mutationFn(data: Record<string, unknown>) {
      const res = await fetch('/api/issue-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, ctx }),
      });

      if (!res.ok) {
        if (res.status === 413) {
          // eslint-disable-next-line no-throw-literal
          throw {
            message: 'Files are too large!',
            info: 'Total file size exceeded limit (5mb)',
          };
        }

        throw new Error(ERR_INTERNAL);
      }
    },
    onSuccess() {
      notifSuccess({
        title: 'Report has been sent!',
        message: 'Thank you for reporting the issue',
      });
      close();
    },
    onError(error) {
      const message = (error as Error)?.message;

      notifError({
        title: message ?? ERR_INTERNAL,
        message: (error as any).info ?? 'Please try again',
      });
    },
  });

  return (
    <Modal.Root
      centered
      opened={isOpen}
      radius="lg"
      padding="xl"
      size="lg"
      onClose={close}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <div className="flex items-center gap-3">
            <Heading size="md">{title}</Heading>
            {isLoading && <Spinner />}
          </div>
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body>
          <ReportModalForm isLoading={isLoading} mutate={mutate} />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ReportModal;
