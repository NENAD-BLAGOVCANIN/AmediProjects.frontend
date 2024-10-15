import { apiUrl } from './config';


export const getAccountsSummary  = async () => {

  try {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${apiUrl}/accounts/summary`, {
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


export const saveAccountDetails = async (data) => {
  const response = await fetch(`${apiUrl}/saveAccountDetails`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Failed to save account details');
  }

  return await response.json();
};