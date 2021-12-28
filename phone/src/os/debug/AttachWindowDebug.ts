import { PhoneEvents } from '@typings/phone';
import { QueueNotificationOptsReadonly } from '@os/new-notifications/hooks/useNotifications';
import { IAlert } from '@os/snackbar/hooks/useSnackbar';
import { NotificationEvents } from '@typings/notifications';

function dispatchEvent<T = any>({ method, app, data }: { method: string; app: string; data: T }) {
  setTimeout(() => {
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          app,
          method,
          data: data ?? {},
        },
      }),
    );
  }, 200);
}

const debugObj = {
  testNotification: () => {
    dispatchEvent<QueueNotificationOptsReadonly>({
      method: NotificationEvents.QUEUE_NOTIFICATION,
      app: 'PHONE',
      data: {
        persist: false,
        uniqId: 'YOU-SUCK',
        appId: 'TWITTER',
        path: '/twitter',
        message: 'Taso just tweeted: You suck bro!',
        duration: 10000,
      },
    });
  },
  closeNotification: (id: string) => {
    dispatchEvent({
      method: NotificationEvents.SET_NOTIFICATION_INACTIVE,
      app: 'PHONE',
      data: id,
    });
  },
  clearAllNotifications: () => {
    dispatchEvent({
      method: NotificationEvents.CLEAR_NOTIFICATIONS,
      data: {},
      app: 'PHONE',
    });
  },
  mockNuiEvent: dispatchEvent,
  testSnackbar: (message: string, type: IAlert) => {
    dispatchEvent({
      app: 'PHONE',
      data: {
        message,
        type,
      },
      method: PhoneEvents.ADD_SNACKBAR_ALERT,
    });
  },
  setPhoneVisible: (bool: boolean) => {
    dispatchEvent({
      method: PhoneEvents.SET_VISIBILITY,
      data: bool,
      app: 'PHONE',
    });
  },
};

const attachWindowDebug = () => {
  (window as any).npwdDebug = debugObj;
};

export default attachWindowDebug;
