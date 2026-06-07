import axios from "axios";

const API_URL =
"http://4.224.186.213/evaluation-service/notifications";

export const fetchNotifications = async (
  page: number,
  limit: number,
  notificationType: string
) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page,
        limit,
        notification_type:
          notificationType || undefined,
      },
    });

    return response.data.notifications;
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error
    );

    return [];
  }
};