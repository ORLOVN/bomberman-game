import {
  iNotification,
  NOTIFICATION_TYPE,
  Store,
} from "react-notifications-component";

export class NotificationService {
  public static notifyInfo(
    message: string,
    options?: Partial<iNotification>
  ): void {
    NotificationService.notify(message, "Info", "info", options);
  }

  public static notifySuccess(
    message: string,
    options?: Partial<iNotification>
  ): void {
    NotificationService.notify(message, "Success", "success", options);
  }

  public static notifyError(
    error: unknown,
    options?: Partial<iNotification>
  ): void {
    const message = error instanceof Error ? error.message : String(error);
    NotificationService.notify(message, "Error", "danger", options);
  }

  public static notifyWarning(
    message: string,
    options?: Partial<iNotification>
  ): void {
    NotificationService.notify(message, "Warning", "warning", options);
  }

  public static removeAllNotifications(): void {
    Store.removeAllNotifications();
  }

  private static notify(
    message: string,
    title: string,
    type: NOTIFICATION_TYPE,
    options: Partial<iNotification> = {}
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
      ...options,
    });
  }
}
