export const requestNotificationPermission = () => {
  if (!('Notification' in window)) {
    return
  }

  try {
    return Notification.requestPermission()
  } catch (e) {
    console.error(e)
  }
}

export const addNotification = (
  text: string,
  options?: { body?: string; img?: string }
) => {
  try {
    return new Notification(text, { body: options?.body, icon: options?.img })
  } catch (e) {
    console.error(e)
  }
}
