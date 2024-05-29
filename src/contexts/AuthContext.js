import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login } from '../api/login';

const AuthContext = createContext();

// Custom hook for accessing the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap your app and provide the auth state
export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Function to log in
    const handleLogin = async (email, password) => {
        const response = await login(email, password);
        if (response.authorisation) {
            const decodedToken = jwtDecode(response.authorisation.token);
            setAuthenticated(true);
            setEmail(email);
            setToken(response.authorisation.token);
            localStorage.setItem('accessToken', response.authorisation.token);
            navigate('/');
            return { success: true };
        } else {
            return { success: false, message: response.message || 'Login failed' };
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setEmail('');
        setToken('');
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const checkTokenExpiration = (token) => {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            handleLogout();
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            checkTokenExpiration(storedToken);
            setAuthenticated(true);
            setToken(storedToken);
            setEmail(jwtDecode(storedToken).email);
        }
        setLoading(false);
    }, []);

    const value = {
        authenticated,
        email,
        token,
        login: handleLogin,
        logout: handleLogout,
        loading
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};