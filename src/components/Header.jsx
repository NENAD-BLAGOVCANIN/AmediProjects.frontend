import React from 'react'
import profileImagePlaceholder from '../assets/img/profile.svg'

function Header({ pageTitle }) {
    return (
        <nav className='header justify-content-between'>
            <h3 className='m-0'>{pageTitle}</h3>
            <img src={profileImagePlaceholder} className='rounded-circle' alt="" style={{maxHeight: 35, height: '100%'}} />
        </nav>
    )
}

export default Header