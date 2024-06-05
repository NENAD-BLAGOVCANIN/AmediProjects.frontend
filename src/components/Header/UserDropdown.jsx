import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faChartSimple, faGauge, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function UserDropdown({ userInfo, setUserInfo }) {

    const userName = userInfo ? userInfo.name : '';
    const { t } = useTranslation();

    return (
        <div>
            <div className="dropdown-menu dropdown-menu-right show active" aria-labelledby="accountDropdown"
                style={{ width: 250 }}>
                <div className="title-wrap d-flex align-items-center pb-4">
                    <h3 className="title text-center justify-content-center w-100 mb-0">{t('greeting.welcome')}, {userName}</h3>
                </div>


                {userInfo?.role?.can_access_admin_panel ? (
                    <li className='nav-item px-2 rounded'>
                        <Link to="/admin/dashboard" className='nav-link'>
                            <FontAwesomeIcon icon={faChartSimple} />
                            <span className='ps-3 medium'>{t('user_dropdown.admin_panel')}</span>
                        </Link>
                    </li>
                ) : null}

                <li className='nav-item px-2 rounded'>
                    <Link to="/profile" className='nav-link'>
                        <FontAwesomeIcon icon={faUser} />
                        <span className='ps-3 medium'>{t('user_dropdown.my_profile')}</span>
                    </Link>
                </li>
                <li className='nav-item px-2 rounded'>
                    <Link to="/logout" className='nav-link'>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span className='ps-3 medium'>{t('user_dropdown.logout')}</span>
                    </Link>
                </li>

            </div>
        </div>
    )
}

export default UserDropdown