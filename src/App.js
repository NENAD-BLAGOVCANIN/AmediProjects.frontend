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
import Salesman from "./pages/salesman/Home";
import Home from "./pages/dashboard/Home";
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
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // or a more sophisticated loading indicator
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {

  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [clients, setClients] = useState([]);

  return (
    <Router>
      <AuthProvider>
        <Routes>

          <Route index element={<Navigate to="/home" />} />

          <Route path="/" element={<AppLayout />}>

            <Route element={<PrivateRoutes />}>

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
              <Route path="/salesman" element={<Salesman />} />

              {/* Personal Pages */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notifications/:id" element={<Notification />} />
              <Route path="/profile" element={<Profile />} />

            </Route>
          </Route>

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users />} />
              <Route path="/admin/projects" element={<ProjectsManagement />} />
            </Route>
          </Route>

          {/* Project Management */}
          <Route path="/" element={<AppLayout />}>
            <Route element={<PrivateRoutes />}>
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/create" element={<CreateNewProject />} />
            </Route>
          </Route>
          <Route
            path="/projects/invite/:inviteCode/:projectId"
            element={<Invite />}
          />

          {/* Auth */}
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
