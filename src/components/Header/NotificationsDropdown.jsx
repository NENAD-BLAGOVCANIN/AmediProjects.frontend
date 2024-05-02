import React from 'react'
import profileImagePlaceholder from '../../assets/img/profile.svg'
import amediProfileImg from '../../assets/img/amediProfileImg.webp'

function NotificationsDropdown({ userInfo, setUserInfo }) {
    return (
        <div>
            <div className="dropdown-menu dropdown-menu-left show active" aria-labelledby="dropdownMenuButton" x-placement="bottom-end"
                style={{ position: 'absolute', width: 450 }}>
                <div className="title-wrap d-flex align-items-center">
                    <h3 className="title mb-0">NOTIFICATIONS</h3>
                </div>
                <ul className="custom-notifications">
                    {userInfo.notifications.map(notification => (
                        <li className="unread" key={notification.id}>
                            <a href="#" className="d-flex">
                                <div className="notification-sender-icon me-3">
                                    <img src={amediProfileImg} alt="Image" className="img-fluid" />
                                </div>
                                <div className='text'>
                                    <strong>
                                        {notification.title}
                                    </strong>
                                    <p className='small pt-1'>
                                        {notification.body}
                                    </p>
                                </div>

                            </a>
                        </li>
                    ))}
                </ul>
                <p className="text-center m-0 p-0"><a href="#" className="small">View All</a></p>

            </div>
        </div>
    )
}

export default NotificationsDropdown