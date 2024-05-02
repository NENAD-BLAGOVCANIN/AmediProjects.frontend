import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass, faTriangleExclamation,
    faUserGroup, faBars, faLayerGroup,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar({ userInfo, setUserInfo }) {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    useEffect(() => {

        function handleResize() {
            if (window.innerWidth < 855) {
                const sidebar = document.getElementById('sidebar');
                if (!sidebar.classList.contains('active')) {
                    sidebar.classList.toggle('active');
                }
                document.documentElement.style.setProperty('--sidebar-width', '0');
            }
        }


        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleModal = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            document.documentElement.style.setProperty('--sidebar-width', '0');
        } else {
            document.documentElement.style.setProperty('--sidebar-width', '236px');
        }
    };

    return (

        <>
            <nav id="sidebar" className={!sidebarActive ? 'active sidebar-admin' : ' sidebar-admin'}>

                <ul className="list-unstyled py-4">

                    <span className='d-flex align-items-center text-white'>
                        <FontAwesomeIcon icon={faArrowLeft} className='pe-2' />
                        Return home
                    </span>

                    <div className='sidebar-link-group'>
                        <div className='pb-2 pt-4'>
                            <span className='small bold text-secondary'>Admin Panel</span>
                        </div>
                        <li className={`nav-item px-2 rounded ${currentPage === '/admin/dashboard' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faCompass} />
                                <span className='ps-3 medium'>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/admin/users' ? 'active' : ''}`}>
                            <Link to="/admin/users" className='nav-link' onClick={() => handlePageChange('/admin/users')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span className='ps-3 medium'>Users</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/admin/projects' ? 'active' : ''}`}>
                            <Link to="/admin/projects" className='nav-link' onClick={() => handlePageChange('/admin/projects')}>
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <span className='ps-3 medium'>Projects</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/user-management' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                <span className='ps-3 medium'>Roles & Permissions</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/history' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faCompass} />
                                <span className='ps-3 medium'>History</span>
                            </Link>
                        </li>
                    </div>

                </ul>

                <div className='btn btn-basic bg-white w-fit position-fixed pointer' id='toggleModalButton' onClick={toggleModal}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

            </nav>

        </>

    )
}

export default Sidebar