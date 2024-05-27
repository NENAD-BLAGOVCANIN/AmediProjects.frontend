import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';
import { getUserInfo } from '../api/user';
import { getMyProjects } from '../api/project';
import i18n from '../i18n';

const pageTitles = {
  "/": "Dashboard",
  "/contacts": "Contacts",
  "/leads": "Leads",
  "/home": "Home",
  "/tasks": "Tasks",
  "/products": "Products",
  "/admin/dashboard": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/users": "Users",
  "/profile": "Profile",
  "/team": "Team",
  "/notifications": "Notifications",
  "/clients": "Clients"
};

function AppLayout() {
  const location = useLocation();
  let pageTitle = pageTitles[location.pathname] || "Page Not Found";
  if (location.pathname.startsWith("/notifications/"))
    pageTitle = "Notification";

  const [userInfo, setUserInfo] = useState(null);
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
        console.log(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching :", error);
      }

      try {
        const fetchedMyProjects = await getMyProjects();
        setMyProjects(fetchedMyProjects);
        console.log(fetchedMyProjects);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchUserInfo();
    

    const isRTL = i18n.language === 'he';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="page-content-wrapper" dir={i18n.language === 'he' ? 'rtl' : 'ltr'}>
      <Sidebar
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        myProjects={myProjects}
        setMyProjects={setMyProjects}
      />
      <div className="main-content-wrapper">
        <Header
          pageTitle={pageTitle}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          myProjects={myProjects}
          setMyProjects={setMyProjects}
        />
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout