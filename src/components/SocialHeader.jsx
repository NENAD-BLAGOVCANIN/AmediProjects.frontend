import React from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

function SocialHeader() {
    return (
        <div className='d-flex justify-content-between px-5 bg-white' style={{ padding: '1.2rem' }}>
            
            <Link to='/'>
                <img src={logo} className='img-fluid' style={{ height: 35 }} alt="" />
            </Link>

            <ul className='nav'>
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
        </div>
    )
}

export default SocialHeader