import React, { useState, useEffect } from "react";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";
import { getProjectMembers } from "../../api/project";

const lngs = {
  en: { nativeName: 'English' },
  he: { nativeName: 'Hebrew' }
};

const flagMapping = {
  English: "https://flagicons.lipis.dev/flags/4x3/us.svg",
  Hebrew: "https://flagicons.lipis.dev/flags/4x3/il.svg",
};


function Header({ pageTitle, userInfo, setUserInfo }) {
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);
  const { t, i18n } = useTranslation();

  const toggleNotificationsDropdown = () => {
    setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const loadProjectInfo = async () => {
    const response = await getProjectMembers();
    setProjectMembers(response.map((response) => response.user));
  };

  useEffect(() => {
    loadProjectInfo();
  }, []);

  return (
    <div className="pb-1 bg-white">
      <nav className="header justify-content-between shadow-sm">
        <div className="d-flex align-items-center">
          <span className="medium fw-500">{pageTitle}</span>
        </div>

        <div className="d-flex align-items-center">
          <div>
            {Object.keys(lngs).map((lng) => (
              <button key={lng} className="btn border-0" type="submit" onClick={() => {
                i18n.changeLanguage(lng);
              }}>
                <img src={flagMapping[lngs[lng].nativeName]} style={{ height: 15 }} />
              </button>
            ))}
          </div>


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
      </nav>
    </div>
  );
}

export default Header;
