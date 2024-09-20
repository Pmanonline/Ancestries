export const UnreadNotificationfunction = (notifications) => {
  return notifications.filter((n) => n.isRead === false);
};
