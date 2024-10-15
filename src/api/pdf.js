import { apiUrl } from './config';


export const generatePdf = async (data) => {
  const response = await fetch(`${apiUrl}/makePdf`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Failed to generate PDF');
  }

  // Create a blob from the response
  const blob = await response.blob();
  
  // Create a link element, set the download attribute, and trigger a download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'document.pdf';
  link.click();
};

export const generateAccountDetailsPdf = async (data) => {
  const response = await fetch(`${apiUrl}/makeAccountDetailsPdf`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (!response.ok) {
      throw new Error('Failed to generate Account Details PDF');
  }

  // Create a blob from the response
  const blob = await response.blob();
  
  // Create a link element, set the download attribute, and trigger a download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'account_details.pdf';
  link.click();
};

/**
 * Function to fetch all price offers
 * @returns {Array} - List of all price offers
 */
export const fetchPriceOffers = async () => {
    const response = await fetch(`${apiUrl}/priceOffers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch price offers');
    }
  
    const data = await response.json();
    return data;
  };
  
  /**
   * Function to fetch a single account by ID
   * @param {number|string} id - The ID of the account to fetch
   * @returns {Object} - The fetched account data
   */
  export const fetchAccount = async (id) => {
    const response = await fetch(`${apiUrl}/accounts/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
        throw new Error('Failed to fetch account');
    }
  
    const data = await response.json();
    return data;
  };
  
  /**
   * Function to fetch all accounts
   * @returns {Array} - List of all accounts
   */
  export const fetchAllAccounts = async () => {
    const response = await fetch(`${apiUrl}/accounts`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
        throw new Error('Failed to fetch accounts');
    }
  
    const data = await response.json();
    return data;
  };

  export const fetchAccountDetailsHtml = async (data) => {
    const response = await fetch(`${apiUrl}/previewAccountDetailsHtml`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch account details HTML');
    }
  
    const result = await response.json();
    return result.html;
  };
  