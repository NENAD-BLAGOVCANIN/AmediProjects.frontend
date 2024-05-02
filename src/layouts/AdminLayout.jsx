import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar';
import Header from '../components/Header/Header';
import { getUserInfo } from '../api/user';

const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/projects": "Projects",
    "/admin/users": "Users",
};

function AdminLayout() {

    const location = useLocation();
    const pageTitle = pageTitles[location.pathname] || "Page Not Found";


    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
                console.log(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }

        };

        fetchUserInfo();

    }, []);


    return (
        <div className="page-content-wrapper">
            <Sidebar userInfo={userInfo} setUserInfo={setUserInfo} />
            <div className="main-content-wrapper">
                <Header pageTitle={pageTitle} userInfo={userInfo} setUserInfo={setUserInfo} />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout