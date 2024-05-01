import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass, faAddressBook, faUser, faListCheck, faCalendar, faUserTie, faRightFromBracket, faTriangleExclamation, faClock,
    faUserGroup, faBars, faGear, faExclamation, faArrowRightArrowLeft, faChartSimple, faNoteSticky,
    faHouse,
    faBox
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getMyProjects, switchProject } from '../api/project';
import { getUserInfo } from '../api/user';
import exampleProjectIcon from '../assets/img/exampleProjectIcon.jpg'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [myProjects, setMyProjects] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
                console.log(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();

    }, []);

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSwitchProject = async (project_id) => {
        try {
            await switchProject(project_id);
            window.location.reload();

        } catch (error) {
            console.error('Error fetching :', error);
        }
    }

    return (

        <>
            <nav id="sidebar" className={!sidebarActive ? 'active' : ''}>

                <div className='pb-2 pb-3'>
                    <div className="dropdown show">
                        <div className="dropdown-toggle medium fw-500" type="button" id="projectsDropdown" onClick={toggleDropdown}
                            aria-haspopup="true" aria-expanded={isDropdownOpen ? "true" : "false"}>
                            <img src={exampleProjectIcon} style={{ height: 15 }} className='rounded me-2' alt="" />
                            {userInfo ? userInfo.project.name.substring(0, 18) : ''}
                        </div>
                        <div className={"dropdown-menu border-0 shadow pt-2 pb-2" + (isDropdownOpen ? " show" : "")} aria-labelledby="projectsDropdown">
                            <Link className="dropdown-item medium py-2" to="/projects/create">
                                <FontAwesomeIcon icon={faPlus} className='pe-2' />
                                New Project
                            </Link>
                            <hr className='m-0 py-2' />
                            {myProjects.map(myProject => (
                                <span className="dropdown-item medium py-2 pointer" key={myProject.id} onClick={() => { handleSwitchProject(myProject.id) }}>{myProject.name}</span>
                            ))}
                            <hr className='m-0' />
                            <Link className="dropdown-item medium pt-2 pb-0 text-primary" to="/projects">
                                View All
                            </Link>
                        </div>
                    </div>
                </div>


                <ul className="list-unstyled py-4">

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
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

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-secondary'>Project</span>
                        </div>

                        <li className={`nav-item px-2 rounded ${currentPage === '/home' ? 'active' : ''}`}>
                            <Link to="/home" className='nav-link' onClick={() => handlePageChange('/home')}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className='ps-3 medium'>Home</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/tasks' ? 'active' : ''}`}>
                            <Link to="/tasks" className='nav-link d-flex align-items-center' onClick={() => handlePageChange('/tasks')}>
                                <FontAwesomeIcon icon={faListCheck} />
                                <span className='ps-3 medium d-flex align-items-center'>
                                    <span className='pe-2'>Tasks</span>
                                    <span className='badge badge-pill badge-primary bg-danger py-1' style={{ paddingLeft: '.3rem', paddingRight: '.3rem' }}><span style={{ fontSize: 11 }}>3</span></span>
                                </span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/products' ? 'active' : ''}`}>
                            <Link to="/products" className='nav-link' onClick={() => handlePageChange('/products')}>
                                <FontAwesomeIcon icon={faBox} />
                                <span className='ps-3 medium'>Products</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/settings' ? 'active' : ''}`}>
                            <Link to="/settings" className='nav-link' onClick={() => handlePageChange('/settings')}>
                                <FontAwesomeIcon icon={faGear} />
                                <span className='ps-3 medium'>Project Settings</span>
                            </Link>
                        </li>

                    </div>

                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-secondary'>CRM</span>
                        </div>


                        <li className={`nav-item px-2 rounded ${currentPage === '/contacts' ? 'active' : ''}`}>
                            <Link to="/contacts" className='nav-link' onClick={() => handlePageChange('/contacts')}>
                                <FontAwesomeIcon icon={faAddressBook} />
                                <span className='ps-3 medium'>Contacts</span>
                            </Link>
                        </li>
                        <li className={`nav-item px-2 rounded ${currentPage === '/leads' ? 'active' : ''}`}>
                            <Link to="/leads" className='nav-link' onClick={() => handlePageChange('/leads')}>
                                <FontAwesomeIcon icon={faUserTie} />
                                <span className='ps-3 medium'>Leads</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/clients' ? 'active' : ''}`}>
                            <Link to="/clients" className='nav-link' onClick={() => handlePageChange('/tasks')}>
                                <FontAwesomeIcon icon={faUserGroup} />
                                <span className='ps-3 medium'>Clients</span>
                            </Link>
                        </li>
                    </div>


                    <div className='sidebar-link-group'>
                        <div className='pb-2'>
                            <span className='small bold text-secondary'>Account</span>
                        </div>

                        <li className='nav-item px-2 rounded'>
                            <Link to="/profile" className='nav-link'>
                                <FontAwesomeIcon icon={faUser} />
                                <span className='ps-3 medium'>My Profile</span>
                            </Link>
                        </li>

                        <li className={`nav-item px-2 rounded ${currentPage === '/settings' ? 'active' : ''}`}>
                            <Link to="/settings" className='nav-link' onClick={() => handlePageChange('/settings')}>
                                <FontAwesomeIcon icon={faGear} />
                                <span className='ps-3 medium'>Settings</span>
                            </Link>
                        </li>

                        <li className='nav-item px-2 rounded'>
                            <Link to="/logout" className='nav-link'>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className='ps-3 medium'>Logout</span>
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