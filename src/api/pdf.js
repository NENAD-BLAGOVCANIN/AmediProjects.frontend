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
