import { apiUrl } from "./config";

const getNotifications = async (page) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/notifications?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getNotification = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/notifications/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const addNotification = async (notificationData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(notificationData),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateNotification = async (id, notificationData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/notifications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(notificationData),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    } else {
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteNotification = async (id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${apiUrl}/notifications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      return { message: "Notification deleted successfully" };
    } else {
      const responseData = await response.json();
      throw new Error(responseData.errors);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getNotifications,
  getNotification,
  addNotification,
  updateNotification,
  deleteNotification,
};
