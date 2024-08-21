import { apiUrl } from './config'; // Adjust the path as necessary

// Function to create a new monthly collection
export const createMonthlyCollection = async (data) => {
    try {
        const token = localStorage.getItem('accessToken');
        
        const response = await fetch(`${apiUrl}/monthly-collections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        console.error('Error creating monthly collection:', error);
        throw error;
    }
};

// Function to fetch all monthly collections
export const getMonthlyCollections = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/monthly-collections`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        console.error('Error fetching monthly collections:', error);
        throw error;
    }
};

// Function to fetch monthly collections by project ID
export const getMonthlyCollectionsByProjectId = async (projectId) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/monthly-collections/${projectId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        console.error('Error fetching monthly collections by project ID:', error);
        throw error;
    }
};

// Function to update an existing monthly collection
export const updateMonthlyCollection = async (id, data) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/monthly-collections/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
        console.error('Error updating monthly collection:', error);
        throw error;
    }
};
export  const getAmountCollectedThisMonth = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${apiUrl}/monthly-collections-collected-this-month`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData.amount_collected;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

