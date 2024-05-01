import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import profileImagePlaceholder from '../assets/img/profile.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function SocialHeader() {
    return (
        <div className='d-flex justify-content-between align-items-center px-5 bg-white' style={{ padding: '1.2rem' }}>

            <Link to='/'>
                <img src={logo} className='img-fluid' style={{ height: 35 }} alt="" />
            </Link>

            <ul className='nav'>
                <li className='nav-item'>
                    <a href="/projects" className='nav-link medium color-text-lighter active'>Projects</a>
                </li>
                <li className='nav-item'>
                    <a href="" className='nav-link medium color-text-lighter'>Support</a>
                </li>
                <li className='nav-item'>
                    <a href="" className='nav-link medium color-text-lighter'>Docs</a>
                </li>
                <li className='nav-item'>
                    <a href="" className='nav-link medium color-text-lighter'>Templates</a>
                </li>
            </ul>

            <div className='d-flex align-items-center'>
                <div className='px-2 mx-1 d-flex flex-column align-items-center justify-content-center'>
                    <FontAwesomeIcon icon={faBell} className='h4 text-muted m-0 pointer' />
                </div>
                <div className='px-2 mx-1 d-flex flex-column align-items-center justify-content-center'>
                    <img src={profileImagePlaceholder} className='rounded pointer' alt="" style={{ maxHeight: 28, height: '100%' }} />
                </div>
            </div>


        </div>
    )
}

export default SocialHeader