import React from 'react'
import profileImagePlaceholder from '../../assets/img/profile.svg'

function NotificationsDropdown({ userInfo, setUserInfo }) {
    return (
        <div>
            <div class="dropdown-menu dropdown-menu-right show active" aria-labelledby="dropdownMenuButton" x-placement="bottom-end"
                style={{ position: 'absolute', transform: 'translate3d(-100%, 35px, 0px)', width: 450 }}>
                <div class="title-wrap d-flex align-items-center">
                    <h3 class="title mb-0">Notifications</h3>
                </div>
                <ul class="custom-notifications">
                    {userInfo.notifications.map(notification => (
                        <li className="unread" key={notification.id}>
                            <a href="#" className="d-flex">
                                <div className="img me-3">
                                    <img src={profileImagePlaceholder} alt="Image" className="img-fluid" />
                                </div>
                                <div className='text'>
                                    <strong>
                                        {notification.title}
                                    </strong>
                                    <p>
                                        {notification.body}
                                    </p>
                                </div>

                            </a>
                        </li>
                    ))}
                </ul>
                <p class="text-center m-0 p-0"><a href="#" class="small">View All</a></p>

            </div>
        </div>
    )
}

export default NotificationsDropdown