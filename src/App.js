import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import { isLoggedIn } from './utils/auth';
import Tasks from './pages/Tasks';
import Logout from './pages/Logout';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Invite from './pages/Invite';
import Projects from './pages/Projects';
import Notifications from "./pages/Notifications";
import Notification from "./pages/Notification";
import Users from "./pages/admin/Users";
import CreateNewProject from "./pages/CreateNewProject";
import Home from "./pages/salesman/Home";
import Planner from "./pages/planner/Home";
import ProjectManagement from "./pages/projectManagement/Home";
import Collection from "./pages/collection/Home";
import DashboardProject from "./pages/dashboard/Home";
import Products from "./pages/salesman/Products";
import AppLayout from "./layouts/AppLayout";
import ProjectsManagement from "./pages/admin/ProjectsManagement";
import AdminLayout from "./layouts/AdminLayout";
import LandingLayout from "./layouts/LandingLayout";
import Clients from './pages/Clients';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedIn = isLoggedIn();
      setAuthenticated(loggedIn);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              authenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />

          {/* CRM */}
          <Route
            path="/contacts"
            element={
              <Contacts
                contacts={contacts}
                setContacts={setContacts}
                setLeads={setLeads}
              />
            }
          />
          <Route
            path="/leads"
            element={
              <Leads
                leads={leads}
                setLeads={setLeads}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />
          <Route
            path="/dashboardProject"
            element={
              <DashboardProject
                leads={leads}
                setLeads={setLeads}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />
          <Route
            path="/planner"
            element={
              <Planner
                leads={leads}
                setLeads={setLeads}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />
          <Route
            path="/projectManagement"
            element={
              <ProjectManagement
                leads={leads}
                setLeads={setLeads}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />
          <Route
            path="/collection"
            element={
              <Collection
                leads={leads}
                setLeads={setLeads}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />

          <Route
            path="/clients"
            element={
              <Clients
                clients={clients}
                setClients={setClients}
                contacts={contacts}
                setContacts={setContacts}
              />
            }
          />

          {/* Project */}
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/products" element={<Products />} />
          <Route path="/team" element={<Team />} />

          {/* Personal Pages */}
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/notifications/:id" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/projects" element={<ProjectsManagement />} />
        </Route>

        {/* Project Management */}
        <Route path="/" element={<AppLayout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<CreateNewProject />} />
        </Route>
        <Route
          path="/projects/invite/:inviteCode/:projectId"
          element={<Invite />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <Login
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          }
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
