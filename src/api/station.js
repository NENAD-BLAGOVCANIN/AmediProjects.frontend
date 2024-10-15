import { apiUrl } from './config';

export const updateProjectOrder = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await fetch(`${apiUrl}/update-project-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update project order');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};


const getStations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
  
      const response = await fetch(`${apiUrl}/stations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        return responseData;
      } else {
        throw new Error(responseData.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

const saveStation = async (name, location) => {
    try {
        const token = localStorage.getItem('accessToken');
        const data = {
            "name": name,
            "location": location
        };

        const response = await fetch(`${apiUrl}/stations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteStation = async (station_id) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/stations/${station_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
}

const updateStation = async ({ station_id, project_id, status, due_date, installer }) => {
  try {
      const token = localStorage.getItem('accessToken');
      const data = {
          station_id: station_id,
          project_id: project_id,
          status: status,
          due_date: due_date,
          installer: installer
      };

      const response = await fetch(`${apiUrl}/stations/update/${project_id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
          throw new Error(responseData.message || 'Failed to update station');
      }

      return responseData;
  } catch (error) {
      throw new Error(error.message);
  }
};


  

export { getStations, saveStation, deleteStation, updateStation };
