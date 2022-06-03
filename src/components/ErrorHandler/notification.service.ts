import {NOTIFICATION_TYPE, Store} from 'react-notifications-component';

class NotificationService {
  notifyInfo(message: string): void {
      this.notify(message, 'Info', 'info');
  }

  notifySuccess(message: string): void {
    this.notify(message, 'Success', 'success');
  }

  notifyError(message: string): void {
    this.notify(message, 'Error', 'danger');
  }

  notifyWarning(message: string): void {
    this.notify(message, 'Warning', 'warning');
  }

  private notify(message: string, title: string, type: NOTIFICATION_TYPE): void {
    Store.addNotification({
      title: title,
      message: message,
      type,
      container: "bottom-left",
      dismiss: {
        duration: 5000,
        pauseOnHover: true,
        onScreen: true,
      }
    });
  }

  removeAllNotifications(): void {
    Store.removeAllNotifications();
  }
}

export const notificationService = new NotificationService();
