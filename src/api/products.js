import { apiUrl } from './config';

const getProducts = async () => {

    try {

        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/products', {
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

const saveProduct = async (product) => {

    try {

        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(product)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }

}

const updateProduct = async (product) => {

    try {

        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/products/' + product.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(product)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }

}



const deleteProduct = async (product_id) => {

    try {

        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/products/' + product_id, {
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


export { getProducts, saveProduct, updateProduct, deleteProduct };