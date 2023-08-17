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
