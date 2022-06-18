import { NOTIFICATION_TYPE, Store } from "react-notifications-component";

class NotificationService {
  notifyInfo(message: string): void {
    this.notify(message, "Info", "info");
  }

  notifySuccess(message: string): void {
    this.notify(message, "Success", "success");
  }

  notifyError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    this.notify(message, "Error", "danger");
  }

  notifyWarning(message: string): void {
    this.notify(message, "Warning", "warning");
  }

  private notify(
    message: string,
    title: string,
    type: NOTIFICATION_TYPE
  ): void {
    Store.addNotification({
      title,
      message,
      type,
      container: "bottom-left",
      dismiss: {
        duration: 5000,
        pauseOnHover: true,
        onScreen: true,
      },
    });
  }

  removeAllNotifications(): void {
    Store.removeAllNotifications();
  }
}

export const notificationService = new NotificationService();
