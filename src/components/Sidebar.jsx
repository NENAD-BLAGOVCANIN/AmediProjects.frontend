import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faAddressBook, faUser, faListCheck, faUserTie, faRightFromBracket, faBars, faChevronUp, faChevronDown, faGear, faPlus, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../api/user';
import { getMyProjects, switchProject } from '../api/project';
import CreateProjectModal from './CreateProjectModal';
import logo from '../assets/img/icon.png'

function Sidebar() {

    const [sidebarActive, setSidebarActive] = useState(true);
    const [currentPage, setCurrentPage] = useState(window.location.pathname);
    const [userInfo, setUserInfo] = useState(null);
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
    const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
    const [myProjects, setMyProjects] = useState([]);

    const toggleDropdown = () => {
        setProjectDropdownOpen(!projectDropdownOpen);
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const fetchedUserInfo = await getUserInfo();
                setUserInfo(fetchedUserInfo);
            } catch (error) {
                console.error('Error fetching :', error);
            }

            try {
                const fetchedMyProjects = await getMyProjects();
                setMyProjects(fetchedMyProjects);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchUserInfo();

        function handleResize() {
            if (window.innerWidth < 855) {
                setSidebarActive(false);
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
        setSidebarActive(!sidebarActive);
    };

    const handleShowCreateProjectModal = () => {
        setShowCreateProjectModal(true);
    }

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

                <div className='px-3 pb-3'>
                    <img src={logo} className='img-fluid' style={{ maxWidth: 55 }} alt="" />
                </div>

                <div className="nav-item rounded px-2 pointer d-none" onClick={toggleDropdown}>
                    <div className='d-flex align-items-center justify-content-around'>
                        <div className='p-2 rounded bg-black'>
                            <FontAwesomeIcon icon={faUser} className='text-white px-1' />
                        </div>
                        <span className='px-2'>{userInfo && userInfo.project.name}</span>
                        <div className='p-2 d-flex flex-column align-items-center justify-content-center'>
                            <FontAwesomeIcon icon={faChevronUp} className='text-muted small' />
                            <FontAwesomeIcon icon={faChevronDown} className='text-muted small' />
                        </div>
                    </div>

                    {projectDropdownOpen && (
                        <div className="dropdown-menu border-0 shadow w-100 show" aria-labelledby="dropdownMenuButton" style={{ transform: 'translateY(50%)', left: 0 }}>
                            <a className="dropdown-item fw-500 pb-2 small">Projects</a>
                            {myProjects.map(project => (
                                <a className="dropdown-item d-flex align-items-center py-2" onClick={() => { handleSwitchProject(project.id) }}>
                                    <span className='small'>{project.name}</span>
                                    <div className='p-2 d-flex flex-column align-items-center justify-content-center'>
                                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className='text-muted small' />
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                <ul className="list-unstyled py-4">
                    <li className={`nav-item px-2 rounded ${currentPage === '/dashboard' ? 'active' : ''}`}>
                        <Link to="/dashboard" className='nav-link' onClick={() => handlePageChange('/dashboard')}>
                            <FontAwesomeIcon icon={faCompass} />
                            <span className='ps-3'>Dashboard</span>
                        </Link>
                    </li>
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
                    <li className={`nav-item px-2 rounded ${currentPage === '/tasks' ? 'active' : ''}`}>
                        <Link to="/tasks" className='nav-link' onClick={() => handlePageChange('/tasks')}>
                            <FontAwesomeIcon icon={faListCheck} />
                            <span className='ps-3'>Tasks</span>
                        </Link>
                    </li>

                    <hr />

                    <li className='nav-item px-2 rounded' onClick={() => { handleShowCreateProjectModal() }}>
                        <span className='nav-link pointer'>
                            <FontAwesomeIcon icon={faPlus} />
                            <span className='ps-3'>Create a project</span>
                        </span>
                    </li>

                    <li className={`nav-item px-2 rounded ${currentPage === '/settings' ? 'active' : ''}`}>
                        <Link to="/settings" className='nav-link' onClick={() => handlePageChange('/settings')}>
                            <FontAwesomeIcon icon={faGear} />
                            <span className='ps-3'>Settings</span>
                        </Link>
                    </li>

                    <hr />

                    <li className='nav-item px-2 rounded'>
                        <Link to="/profile" className='nav-link'>
                            <FontAwesomeIcon icon={faUser} />
                            <span className='ps-3'>My Profile</span>
                        </Link>
                    </li>

                    <li className='nav-item px-2 rounded'>
                        <Link to="/logout" className='nav-link'>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span className='ps-3'>Logout</span>
                        </Link>
                    </li>
                </ul>

                <div className='card w-fit position-fixed pointer' id='toggleModalButton' onClick={toggleModal}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

            </nav>

            <CreateProjectModal
                showCreateProjectModal={showCreateProjectModal}
                setShowCreateProjectModal={setShowCreateProjectModal}
            />

        </>

    )
}

export default Sidebar