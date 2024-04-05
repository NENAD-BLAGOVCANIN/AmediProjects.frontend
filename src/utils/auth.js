import { jwtDecode } from 'jwt-decode';

export const isLoggedIn = () => {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
};


export const isTokenExpired = () => {

    const token = localStorage.getItem('accessToken');

    if (!token) return true;

    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) return true;

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};