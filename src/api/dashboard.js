import { apiUrl } from './config';

const getStats = async () => {

    try {

        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/dashboard/stats', {
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


// src/api/dashboard.js

export const getWeeklyPriceOffers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/weekly-price-offers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.weekly_price_offers;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getWeeklyNewProjects = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/weekly-new-projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.weekly_new_projects;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getPlansOverFourDays = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/plans-over-four-days`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.plans_over_four_days;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getProjectsPerManager = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/projects-per-manager`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.projects_per_manager;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getAccountsPerManager = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/accounts-per-manager`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.accounts_per_manager;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
 
  
// src/api/dashboard.js

export const getAmountCollectedPerMonth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/amount-collected-per-month`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.amount_collected_per_month;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getAmountSentDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/amount-sent-details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.amount_sent_details;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getAccountDetailsSent = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/account-details-sent`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.account_details_sent;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getCollectionTrends = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/collection-trends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.collection_trends;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getCollectionBreakdown = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiUrl}/dashboard/collection-breakdown`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data.collection_breakdown;
      } else {
        throw new Error(data.errors);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

export { getStats  };