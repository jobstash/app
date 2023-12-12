import { type NotificationProps, notifications } from '@mantine/notifications';

const showNotif = (notifProps: NotificationProps) => {
  notifications.show(notifProps);
};

export const notifSuccess = (notifProps: NotificationProps) => {
  showNotif({
    color: 'green',
    ...notifProps,
  });
};

type ErrorNotificationProps = Omit<NotificationProps, 'message'> & {
  message?: string;
};

export const notifError = (notifProps?: ErrorNotificationProps) => {
  showNotif({
    color: 'red',
    ...notifProps,
    title: notifProps?.title ?? 'Something went wrong :(',
    message: notifProps?.message ?? 'Please try again later.',
  });
};

export const notifLoading = (notifProps: NotificationProps) => {
  showNotif({
    color: '#8742ff',
    loading: true,
    autoClose: false,
    withCloseButton: false,
    sx: {
      borderRadius: 8,
    },
    ...notifProps,
  });
};
