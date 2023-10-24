import {
  Button as MButton,
  LoadingOverlay,
  Modal,
  RemoveScroll,
} from '@mantine/core';

import { Heading, Loader, Text } from '@jobstash/shared/ui';

interface Props {
  opened: boolean;
  close: () => void;
  isLoading: boolean;
  onClickDelete: () => void;
}

const AccountCardModal = ({
  opened,
  close,
  isLoading,
  onClickDelete,
}: Props) => (
  <div className={RemoveScroll.classNames.fullWidth}>
    <Modal.Root
      centered
      lockScroll={false}
      opened={opened}
      classNames={{
        content: 'p-4 rounded-xl',
      }}
      closeOnClickOutside={false}
      onClose={close}
    >
      <Modal.Overlay opacity={0.7} />
      <Modal.Content className="relative">
        <LoadingOverlay
          className="z-50"
          visible={isLoading}
          loader={<Loader />}
          overlayOpacity={0.7}
          overlayBlur={0.4}
          overlayColor="#1e1e1e"
        />
        <Modal.Header className="z-10">
          <Modal.Title>
            <Heading size="sm">Delete your profile</Heading>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="pt-2 pb-6">
            <Text color="dimmed">
              Are you sure you want to delete your profile? This action is
              destructive and you will have to contact support to restore your
              data.
            </Text>
          </div>

          <div className="flex justify-end gap-4">
            <div>
              <MButton
                radius="md"
                variant="default"
                size="md"
                classNames={{
                  inner: 'text-md',
                }}
                onClick={close}
              >
                No don&#39;t delete it
              </MButton>
            </div>
            <MButton
              radius="md"
              color="red"
              className="bg-red-500"
              size="md"
              classNames={{
                inner: 'text-md',
              }}
              onClick={onClickDelete}
            >
              Delete account
            </MButton>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  </div>
);

export default AccountCardModal;
