import { Modal } from '@mantine/core';

import { useReportModal, useSendReportMutation } from '@jobstash/shared/state';

import Heading from '../../base/heading';
import Spinner from '../spinner';

import ReportModalForm from './form';

const title = 'Report Issue';
const ReportModal = () => {
  const { isOpen, close } = useReportModal();

  const { isLoading, mutate } = useSendReportMutation();

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
