import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';

const pageTitles = {
    "/": "Dashboard",
    "/contacts": "Contacts",
    "/leads": "Leads",
    "/home": "Home",
    "/tasks": "Tasks",
    "/products": "Products",
    "/admin/dashboard": "Dashboard",
    "/admin/users": "Users",
    "/profile": "Profile"
};

function AppLayout() {

    const location = useLocation();
    const pageTitle = pageTitles[location.pathname] || "Page Not Found";

    return (
        <div className="page-content-wrapper">
            <Sidebar />
            <div className="main-content-wrapper">
                <Header pageTitle={pageTitle} />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AppLayout