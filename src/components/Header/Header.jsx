import React, { useState, useEffect } from "react";
import profileImagePlaceholder from "../../assets/img/profile.svg";
import placeholderProfileImage1 from "../../assets/img/placeholder-profile-img-1.jpeg";
import placeholderProfileImage2 from "../../assets/img/placeholder-profile-img-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NotificationsDropdown from "./NotificationsDropdown";
import UserDropdown from "./UserDropdown";
import { getProjectMembers } from "../../api/project";

function Header({ pageTitle, userInfo, setUserInfo }) {
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [projectMembers, setProjectMembers] = useState([]);

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
          <div className="px-5">
            {projectMembers?.map((member) => {
              return (
                <img
                  src={member?.profile_image ?? profileImagePlaceholder}
                  key={member?.id}
                  className="rounded-circle"
                  alt=""
                  style={{
                    maxHeight: 26,
                    aspectRatio: 1,
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              );
            })}
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
