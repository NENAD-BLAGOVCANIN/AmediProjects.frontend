import { apiUrl } from './config';

const login = async (email, password) => {
    
    const variables = {
        email: email,
        password: password
    };

    try {
        const response = await fetch(apiUrl+'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(variables)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || 'Login failed');
        }

        return responseData;

    } catch (error) {
        return { success: false, message: error.message };
    }
};


export { login };
