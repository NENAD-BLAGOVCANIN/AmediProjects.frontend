import React, { useState } from 'react'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header({ pageTitle }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <nav className='header justify-content-between'>
            <div className='d-flex align-items-center'>
                <h3 className='m-0'>{pageTitle}</h3>
                <div className='px-4'>
                    <div class="dropdown show">
                    <button className="btn btn-basic dropdown-toggle" type="button" id="projectsDropdown" onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isDropdownOpen ? "true" : "false"}>
                            Test Project
                        </button>
                        <div className={"dropdown-menu border-0 shadow" + (isDropdownOpen ? " show" : "")} aria-labelledby="projectsDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
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