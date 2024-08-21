import { apiUrl } from './config';

const getSummaryInstallations = async () => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_installations`, {
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

const saveSummaryInstallation = async (summaryInstallationData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_installations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryInstallationData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteSummaryInstallation = async (summaryInstallationId) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_installations/${summaryInstallationId}`, {
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

const updateSummaryInstallation = async (summaryInstallationId, summaryInstallationData) => {
    try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${apiUrl}/summary_installations/${summaryInstallationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(summaryInstallationData)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        throw new Error(error.message);
    }
};

export { getSummaryInstallations, saveSummaryInstallation, deleteSummaryInstallation, updateSummaryInstallation };
