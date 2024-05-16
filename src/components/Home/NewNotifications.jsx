import React from 'react'
import amediProfileImg from '../../assets/img/amediProfileImg.webp'
import { convertHtmlToText } from "../Header/NotificationsDropdown";

function NewNotifications({ userInfo }) {
  return (
    <div className="bg-white rounded p-3 shadow-sm">
      <h6 className="bold mb-3">Alerts</h6>

      <ul className="custom-notifications">
        {userInfo?.notifications?.map((notification) => (
          <li className="unread" key={notification.id}>
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
      <p className="text-center m-0 p-0">
        <a href="/notifications" className="small">
          View All
        </a>
      </p>
    </div>
  );
}

export default NewNotifications