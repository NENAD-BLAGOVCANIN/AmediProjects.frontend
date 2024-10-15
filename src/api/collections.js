import { apiUrl } from './config';

const getCollections = async () => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/collections', {
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
        throw new Error(error);
    }
}
const getSumOfDebt = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${apiUrl}/collections/sum-debt`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData.sum_of_debt;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
const saveCollection = async (collection) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(collection)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }
}

const updateCollection = async (collection) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/collections/' + collection.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(collection)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }
}

const deleteCollection = async (collection_id) => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/collections/' + collection_id, {
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
        return error;
    }
}

export const updateArchiveStatus = async (id, data) => {
    try {
      const token = localStorage.getItem("accessToken");
  
      const response = await fetch(`${apiUrl}/collections/${id}/archive`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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

  export const updateCollectionStatus = async (id, data) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/collections/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
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


export { getCollections, saveCollection ,updateCollection, deleteCollection , getSumOfDebt  };
