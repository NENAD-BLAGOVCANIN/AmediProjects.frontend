import { apiUrl } from './config';

const getSummaryDays = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary-days`, {
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

const saveSummaryDay = async (summaryDayData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary-days`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryDayData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteSummaryDay = async (summaryDayId) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary-days/${summaryDayId}`, {
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
};

const updateSummaryDay = async (summaryDayId, summaryDayData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary-days/${summaryDayId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryDayData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

const getCollectionSummary = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${apiUrl}/summary-days-id`, {
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
}

export { getSummaryDays, saveSummaryDay, deleteSummaryDay, updateSummaryDay , getCollectionSummary };
