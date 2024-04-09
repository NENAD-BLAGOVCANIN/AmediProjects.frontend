import React, { useState, useEffect } from 'react'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo } from '../api/user';
import { getMyProjects, switchProject } from '../api/project';
import { Link } from 'react-router-dom';

function Header({ pageTitle }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [myProjects, setMyProjects] = useState([]);
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
        <nav className='header justify-content-between'>
            <div className='d-flex align-items-center'>
                <h3 className='m-0'>{pageTitle}</h3>
                <div className='px-4'>
                    <div className="dropdown show">
                        <button className="btn btn-basic dropdown-toggle" type="button" id="projectsDropdown" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen ? "true" : "false"}>
                            {userInfo ? userInfo.project.name : ''}
                        </button>
                        <div className={"dropdown-menu border-0 shadow pt-2 pb-3" + (isDropdownOpen ? " show" : "")} aria-labelledby="projectsDropdown">
                            <Link className="dropdown-item py-2" to="/projects/create">
                                <FontAwesomeIcon icon={faPlus} className='pe-2' />
                                New Project
                            </Link>
                            <hr className='m-0 py-2' />
                            {myProjects.map(myProject => (
                                <a className="dropdown-item py-2" key={myProject.id} href="#">{myProject.name}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex align-items-center'>
                <div className='px-5'>
                    <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 35, height: '100%' }} />
                    <img src={placeholderProfileImage1} className='rounded-circle transform-left-35' alt="" style={{ maxHeight: 35, height: '100%' }} />
                    <img src={placeholderProfileImage2} className='rounded-circle transform-left-75' alt="" style={{ maxHeight: 35, height: '100%' }} />
                </div>
                <div className='px-2 d-flex flex-column align-items-center justify-content-center'>
                    <FontAwesomeIcon icon={faBell} className='h4 m-0 pointer' />
                </div>
                <div className='px-2 d-flex flex-column align-items-center justify-content-center'>
                    <FontAwesomeIcon icon={faEnvelope} className='h4 m-0 pointer' />
                </div>
            </div>

        </nav>
    )
}

export default Header