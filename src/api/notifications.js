import { apiUrl } from "./config";

const getNotifications = async (page) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + `/notifications?page=${page}`, {
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

    const response = await fetch(apiUrl + `/notifications/${id}`, {
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

export { getNotifications, getNotification };
