import React from "react";
import { useTranslation } from 'react-i18next';
import amediProfileImg from "../../assets/img/amediProfileImg.webp";

function NotificationsDropdown({ userInfo, setUserInfo }) {
  return (
    <div>
      <div
        className="dropdown-menu dropdown-menu-left show active"
        aria-labelledby="dropdownMenuButton"
        style={{ position: "absolute", width: 450 }}
      >
        <div className="title-wrap d-flex align-items-center">
          <h3 className="title mb-0">NOTIFICATIONS</h3>
        </div>
        <ul className="custom-notifications">
          {userInfo.notifications.map((notification) => (
            <li className="hover-lg unread" key={notification.id}>
              <a href={`/notifications/${notification.id}`} className="d-flex">
                <div className="notification-sender-icon me-3">
                  <img
                    src={amediProfileImg}
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
        <p className="text-center m-0 py-2">
          <a href="/notifications" className="small text-primary">
            View All
          </a>
        </p>
      </div>
    </div>
  );
}

export default NotificationsDropdown;

export const convertHtmlToText = (html) => html.replace(/<[^>]+>/g, "");
