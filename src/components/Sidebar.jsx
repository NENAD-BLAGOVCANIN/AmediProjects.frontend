import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass, faAddressBook, faUser, faListCheck, faCalendar, faUserTie, faRightFromBracket, faTriangleExclamation, faClock,
    faUserGroup, faBars, faGear, faExclamation, faArrowRightArrowLeft, faChartSimple, faNoteSticky,
    faHouse,
    faBox
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/img/icon.png'

function Sidebar() {

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
            document.documentElement.style.setProperty('--sidebar-width', '310px');
        }
    };


    return (

        <>
            <nav id="sidebar" className={!sidebarActive ? 'active' : ''}>

                <div className='px-3 pb-3'>
                    <img src={logo} className='img-fluid' style={{ maxWidth: 55 }} alt="" />
                </div>


                <ul className="list-unstyled py-4">

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-white'>Admin Panel</span>
                        </div>
                        <li className={`nav-item px-2 rounded ${currentPage === '/admin/dashboard' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faCompass} />
                                <span className='ps-3'>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/admin/users' ? 'active' : ''}`}>
                            <Link to="/admin/users" className='nav-link' onClick={() => handlePageChange('/admin/users')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span className='ps-3'>Users</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/user-management' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                <span className='ps-3'>Roles & Permissions</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/history' ? 'active' : ''}`}>
                            <Link to="/admin/dashboard" className='nav-link' onClick={() => handlePageChange('/admin/dashboard')}>
                                <FontAwesomeIcon icon={faCompass} />
                                <span className='ps-3'>History</span>
                            </Link>
                        </li>
                    </div>

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-white'>Project</span>
                        </div>

                        <li className={`nav-item px-2 rounded ${currentPage === '/home' ? 'active' : ''}`}>
                            <Link to="/home" className='nav-link' onClick={() => handlePageChange('/home')}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className='ps-3'>Home</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/products' ? 'active' : ''}`}>
                            <Link to="/products" className='nav-link' onClick={() => handlePageChange('/products')}>
                                <FontAwesomeIcon icon={faBox} />
                                <span className='ps-3'>Products</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/notes' ? 'active' : ''}`}>
                            <span className='nav-link pointer'>
                                <FontAwesomeIcon icon={faNoteSticky} />
                                <span className='ps-3'>Notes</span>
                            </span>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/performance' ? 'active' : ''}`}>
                            <span className='nav-link pointer'>
                                <FontAwesomeIcon icon={faChartSimple} />
                                <span className='ps-3'>Performance</span>
                            </span>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/settings' ? 'active' : ''}`}>
                            <Link to="/settings" className='nav-link' onClick={() => handlePageChange('/settings')}>
                                <FontAwesomeIcon icon={faGear} />
                                <span className='ps-3'>Project Settings</span>
                            </Link>
                        </li>

                    </div>

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-white'>CRM</span>
                        </div>


                        <li className={`nav-item px-2 rounded ${currentPage === '/contacts' ? 'active' : ''}`}>
                            <Link to="/contacts" className='nav-link' onClick={() => handlePageChange('/contacts')}>
                                <FontAwesomeIcon icon={faAddressBook} />
                                <span className='ps-3'>Contacts</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/leads' ? 'active' : ''}`}>
                            <Link to="/leads" className='nav-link' onClick={() => handlePageChange('/leads')}>
                                <FontAwesomeIcon icon={faUserTie} />
                                <span className='ps-3'>Leads</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/clients' ? 'active' : ''}`}>
                            <Link to="/clients" className='nav-link' onClick={() => handlePageChange('/tasks')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span className='ps-3'>Clients</span>
                            </Link>
                        </li>
                    </div>


                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-white'>Work</span>
                        </div>

                        <li className={`nav-item px-2 rounded ${currentPage === '/tasks' ? 'active' : ''}`}>
                            <Link to="/tasks" className='nav-link' onClick={() => handlePageChange('/tasks')}>
                                <FontAwesomeIcon icon={faListCheck} />
                                <span className='ps-3'>Tasks</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/calendar' ? 'active' : ''}`}>
                            <Link to="/calendar" className='nav-link' onClick={() => handlePageChange('/calendar')}>
                                <FontAwesomeIcon icon={faCalendar} />
                                <span className='ps-3'>Calendar</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/hours' ? 'active' : ''}`}>
                            <Link to="/hours" className='nav-link' onClick={() => handlePageChange('/hours')}>
                                <FontAwesomeIcon icon={faClock} />
                                <span className='ps-3'>Hours</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/alerts' ? 'active' : ''}`}>
                            <Link to="/alerts" className='nav-link' onClick={() => handlePageChange('/alerts')}>
                                <FontAwesomeIcon icon={faExclamation} />
                                <span className='ps-3'>Alerts</span>
                            </Link>
                        </li>
                    </div>


                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-white'>Account</span>
                        </div>

                        <li className='nav-item px-2 rounded'>
                            <Link to="/profile" className='nav-link'>
                                <FontAwesomeIcon icon={faUser} />
                                <span className='ps-3'>My Profile</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/settings' ? 'active' : ''}`}>
                            <Link to="/settings" className='nav-link' onClick={() => handlePageChange('/settings')}>
                                <FontAwesomeIcon icon={faGear} />
                                <span className='ps-3'>Settings</span>
                            </Link>
                        </li>

                        <li className='nav-item px-2 rounded'>
                            <Link to="/logout" className='nav-link'>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className='ps-3'>Logout</span>
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