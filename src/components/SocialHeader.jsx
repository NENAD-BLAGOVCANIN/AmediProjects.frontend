import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import profileImagePlaceholder from '../assets/img/profile.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import NotificationsDropdown from './Header/NotificationsDropdown';
import UserDropdown from './Header/UserDropdown';

function SocialHeader({ userInfo, setUserInfo }) {

    const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleNotificationsDropdown = () => {
        setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    return (
      <div
        className="d-flex justify-content-between align-items-center px-5 bg-white"
        style={{ padding: "1.2rem" }}
      >
        <Link to="/">
          <img src={logo} className="img-fluid" style={{ height: 35 }} alt="" />
        </Link>

        <ul className="nav">
          <li className="nav-item">
            <a
              href="/projects"
              className="nav-link medium color-text-lighter active"
            >
              My Projects
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link medium color-text-lighter">
              Support
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link medium color-text-lighter">
              Docs
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link medium color-text-lighter">
              Terms of Service
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link medium color-text-lighter">
              Privacy Policy
            </a>
          </li>
        </ul>

        <div className="d-flex align-items-center">
          <div className="px-2 mx-1 d-flex flex-column align-items-center justify-content-center">
            <div className="dropdown custom-dropdown">
              <a
                href="#"
                onClick={toggleNotificationsDropdown}
                className="dropdown-link d-flex align-items-center"
                aria-haspopup="true"
                aria-expanded={isNotificationsDropdownOpen}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="h4 text-muted m-0 pointer"
                />
              </a>

              {isNotificationsDropdownOpen && (
                <NotificationsDropdown
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                />
              )}
            </div>
          </div>
          <div className="px-2 mx-1 d-flex flex-column align-items-center justify-content-center">
            <div className="dropdown custom-dropdown">
              <a
                href="#"
                onClick={toggleUserDropdown}
                className="dropdown-link d-flex align-items-center"
                aria-haspopup="true"
                aria-expanded={isUserDropdownOpen}
              >
                <img
                  src={userInfo?.profile_image ?? profileImagePlaceholder}
                  className="rounded pointer"
                  alt=""
                  style={{
                    maxHeight: 28,
                    aspectRatio: 1,
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              </a>

              {isUserDropdownOpen && (
                <UserDropdown userInfo={userInfo} setUserInfo={setUserInfo} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default SocialHeader