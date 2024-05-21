import React from 'react'
import amediProfileImg from '../../assets/img/amediProfileImg.webp'
import { convertHtmlToText } from "../Header/NotificationsDropdown";
import { useTranslation } from 'react-i18next';

function NewNotifications({ userInfo }) {
  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">New Notifications</h6>

      <ul className="custom-notifications" style={{height: 'unset'}}>
        {userInfo?.notifications?.map((notification) => (
          <li key={notification.id} className='hover-lg'>
            <a
              href={`/notifications/${notification.id}`}
              className="d-flex gap-3"
            >
              <div className="notification-sender-icon">
                <img
                  src={amediProfileImg}
                  alt="profile"
                  className="img-fluid"
                />
              </div>
              <div className="text">
                <strong>{notification.title}</strong>
                <p className="small pt-1">
                  {convertHtmlToText(notification.body)}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewNotifications