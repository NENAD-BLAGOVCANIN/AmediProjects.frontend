import { apiUrl } from './config';

let cachedBonuses = null;

const getBonuses = async () => {
    try {
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(apiUrl + '/bonuses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            cachedBonuses = responseData; // Cache the bonuses
            return responseData;
        } else {
            throw new Error(responseData.errors);
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getBonusNameById = async (id) => {
    if (!cachedBonuses) {
        await getBonuses(); // Fetch bonuses if not already cached
    }
    const bonus = cachedBonuses.find(bonus => bonus.id === parseInt(id));
    return bonus ? bonus.name : 'Unknown Bonus';
}

export { getBonuses, getBonusNameById };
