import React from 'react'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Header({ pageTitle }) {
    return (
        <nav className='header justify-content-between'>
            <h3 className='m-0'>{pageTitle}</h3>
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