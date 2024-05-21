import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faChartSimple, faGauge, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function UserDropdown({ userInfo, setUserInfo }) {

    const userName = userInfo ? userInfo.name : '';

    return (
        <div>
            <div className="dropdown-menu dropdown-menu-left show active" aria-labelledby="accountDropdown"
                style={{ position: 'absolute', width: 250 }}>
                <div className="title-wrap d-flex align-items-center pb-4">
                    <h3 className="title text-center justify-content-center w-100 mb-0">Hello, {userName}</h3>
                </div>


                {userInfo?.role?.can_access_admin_panel ? (
                    <li className='nav-item px-2 rounded'>
                        <Link to="/admin/dashboard" className='nav-link'>
                            <FontAwesomeIcon icon={faChartSimple} />
                            <span className='ps-3 medium'>Admin Panel</span>
                        </Link>
                    </li>
                ) : null}

                <li className='nav-item px-2 rounded'>
                    <Link to="/profile" className='nav-link'>
                        <FontAwesomeIcon icon={faUser} />
                        <span className='ps-3 medium'>My Profile</span>
                    </Link>
                </li>
                <li className='nav-item px-2 rounded'>
                    <Link to="/logout" className='nav-link'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span className='ps-3 medium'>Logout</span>
                    </Link>
                </li>

            </div>
        </div>
    )
}

export default UserDropdown