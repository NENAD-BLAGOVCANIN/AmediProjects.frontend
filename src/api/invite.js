import { apiUrl } from './config';

const handleInviteCode = async (code, project_id) => {

    try {

        const token = localStorage.getItem('accessToken');

        const data = {
            "code": code,
            "project_id": project_id
        }

        const response = await fetch(apiUrl + '/handle-invite-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        return error;
    }

}

export { handleInviteCode }