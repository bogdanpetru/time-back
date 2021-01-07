export const requestNotificationPermission = Notification.requestPermission
export const addNotification = (
  text: string,
  options?: { body?: string; img?: string }
) => new Notification(text, { body: options?.body, icon: options?.img })
