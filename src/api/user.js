import { apiUrl } from "./config";

const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

const getUsers = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

const deleteUser = async (user_id) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/users/" + user_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const updateProfileImage = async (file) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (file.size > 2 * 1024 * 1024) {
      window.alert("File size exceeds 2MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", file);

    const response = await fetch(apiUrl + "/profile/image", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      body: formData,
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

export { getUserInfo, getUsers, deleteUser, updateProfileImage };
