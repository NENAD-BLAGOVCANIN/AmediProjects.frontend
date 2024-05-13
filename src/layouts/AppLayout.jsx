import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header/Header';
import { getUserInfo } from '../api/user';
import { getMyProjects } from '../api/project';

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
  }, []);

  return (
    <div className="page-content-wrapper">
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