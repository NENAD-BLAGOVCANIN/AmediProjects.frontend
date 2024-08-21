import { apiUrl } from './config';

const getSummaryPlanners = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_planners`, {
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

const saveSummaryPlanners = async (summaryPlannersData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_planners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryPlannersData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteSummaryPlanners = async (summaryPlannersId) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_planners/${summaryPlannersId}`, {
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

const updateSummaryPlanners = async (summaryPlannersId, summaryPlannersData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_planners/${summaryPlannersId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryPlannersData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

export { getSummaryPlanners, saveSummaryPlanners, deleteSummaryPlanners, updateSummaryPlanners };
