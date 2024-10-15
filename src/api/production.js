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
        'Authorization': 'Bearer ' + token,  // No Content-Type header here
      },
      body: production,  // Pass the FormData directly
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};


const updateProduction = async (production, id) => {
  try {
    const token = localStorage.getItem("accessToken");

    // Append _method: 'PUT' to the FormData
    if (!(production instanceof FormData)) {
      throw new Error('production must be a FormData instance');
    }
    production.append('_method', 'PUT');

    const response = await fetch(`${apiUrl}/productions/${id}`, {
      method: "POST",  // Use POST method for method spoofing
      headers: {
        'Authorization': 'Bearer ' + token,  // Do not set 'Content-Type' header
      },
      body: production,  // Pass the FormData directly
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.errors || 'Failed to update production');
    }

    return responseData;
  } catch (error) {
    console.error('Error updating production:', error);
    throw error;
  }
};








const deleteProduction = async (productionId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(apiUrl + "/productions/" + productionId, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    return error;
  }
};

const getActivePlanningProductions = async () => {
  try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/productions-active-planning`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
      });

      const responseData = await response.json();

      if (response.ok) {
          return responseData.active_plannings;
      } else {
          throw new Error(responseData.errors);
      }
  } catch (error) {
      throw new Error(error.message);
  }
};
export {
  getProductions,
  saveProduction,
  deleteProduction,
  getActivePlanningProductions ,
  updateProduction
};
