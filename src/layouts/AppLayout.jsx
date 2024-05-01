import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function AppLayout() {
    return (
        <div className="page-content-wrapper">
            <Sidebar />
            <div className="main-content-wrapper">
                <Header pageTitle="Dashboard" />
                <div className="main-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AppLayout