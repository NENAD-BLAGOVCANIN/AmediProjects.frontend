import React from 'react'
import profileImagePlaceholder from '../../assets/img/profile.svg'

function NotificationsDropdown() {
    return (
        <div>
            <div class="dropdown-menu dropdown-menu-right show active" aria-labelledby="dropdownMenuButton" x-placement="bottom-end"
                style={{ position: 'absolute',  transform: 'translate3d(-100%, 35px, 0px)', width: 450 }}>
                <div class="title-wrap d-flex align-items-center">
                    <h3 class="title mb-0">Notifications</h3>
                </div>
                <ul class="custom-notifications">
                    <li class="unread">
                        <a href="#" class="d-flex">
                            <div class="img me-3">
                                <img src={profileImagePlaceholder} alt="Image" class="img-fluid" />
                            </div>
                            <div class="text">
                                <strong>Claudia Gideon</strong> marked the task done a day ago
                            </div>
                        </a>
                    </li>
                    <li class="unread">
                        <a href="#" class="d-flex">
                            <div class="img me-3">
                                <img src={profileImagePlaceholder} alt="Image" class="img-fluid" />
                            </div>
                            <div class="text">
                                <strong>Alex Stafford</strong> marked the task done a day ago
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="d-flex">
                            <div class="img me-3">
                                <img src={profileImagePlaceholder} alt="Image" class="img-fluid" />
                            </div>
                            <div class="text">
                                <strong>Devin Richards</strong> mentioned you in her comment on Invoices 2 days ago
                            </div>
                        </a>
                    </li>
                    <li class="">
                        <a href="#" class="d-flex">
                            <div class="img me-3">
                                <img src={profileImagePlaceholder} alt="Image" class="img-fluid" />
                            </div>
                            <div class="text">
                                <strong>Alex Stafford</strong> marked the task done a day ago
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="d-flex">
                            <div class="img me-3">
                                <img src={profileImagePlaceholder} alt="Image" class="img-fluid" />
                            </div>
                            <div class="text">
                                <strong>Devin Richards</strong> mentioned you in her comment on Invoices 2 days ago
                            </div>
                        </a>
                    </li>
                </ul>
                <p class="text-center m-0 p-0"><a href="#" class="small">View All</a></p>

            </div>
        </div>
    )
}

export default NotificationsDropdown