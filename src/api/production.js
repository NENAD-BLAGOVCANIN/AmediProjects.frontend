import { apiUrl } from "./config";

const getProductions = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/productions", {
      method: "GET",
      headers: {
        Accept: "application/json",
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

const saveProduction = async (production) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/productions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(production),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const updateProduction = async (production) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/productions/" + production.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(production),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const deleteProduction = async (productionId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/productions/" + productionId, {
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

export {
  getProductions,
  saveProduction,
  updateProduction,
  deleteProduction,
};
