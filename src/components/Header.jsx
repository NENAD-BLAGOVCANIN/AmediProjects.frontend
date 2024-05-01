import React, { useState, useEffect } from 'react'
import profileImagePlaceholder from '../assets/img/profile.svg'
import placeholderProfileImage1 from '../assets/img/placeholder-profile-img-1.jpeg'
import placeholderProfileImage2 from '../assets/img/placeholder-profile-img-2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getUserInfo } from '../api/user';

function Header({ pageTitle }) {

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
        <div className='pb-1 bg-white'>
            <nav className='header justify-content-between shadow-sm'>
                <div className='d-flex align-items-center'>
                    <span className='medium fw-500'>{pageTitle}</span>
                </div>

                <div className='d-flex align-items-center'>
                    <div className='px-5'>
                        <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{ maxHeight: 28, height: '100%' }} />
                        <img src={placeholderProfileImage1} className='rounded-circle transform-left-35' alt="" style={{ maxHeight: 28, height: '100%' }} />
                        <img src={placeholderProfileImage2} className='rounded-circle transform-left-75' alt="" style={{ maxHeight: 28, height: '100%' }} />
                    </div>
                    <div className='px-2 mx-1 d-flex flex-column align-items-center justify-content-center'>
                        <FontAwesomeIcon icon={faBell} className='h4 text-muted m-0 pointer' />
                    </div>
                    <div className='px-2 mx-1 d-flex flex-column align-items-center justify-content-center'>
                        <img src={profileImagePlaceholder} className='rounded pointer' alt="" style={{ maxHeight: 28, height: '100%' }} />
                    </div>
                </div>

            </nav>

        </div>

    )
}

export default Header