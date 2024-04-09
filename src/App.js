import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { isLoggedIn } from './utils/auth';
import Tasks from './pages/Tasks';
import Logout from './pages/Logout';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Invite from './pages/Invite';
import Projects from './pages/Projects';
import Users from './pages/admin/Users';
import CreateNewProject from './pages/CreateNewProject';
import Home from './pages/project/Home';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedIn = isLoggedIn();
      setAuthenticated(loggedIn);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return <div>Redirecting...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/admin/dashboard" /> : <Navigate to="/login" />} />

        <Route path="/tasks" element={<Tasks />} />
        <Route path="/contacts" element={<Contacts contacts={contacts} setContacts={setContacts} setLeads={setLeads} />} />
        <Route path="/leads" element={<Leads leads={leads} setLeads={setLeads} contacts={contacts} setContacts={setContacts} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Project */}
        <Route path="/home" element={<Home />} />

        {/* Project Management */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/create" element={<CreateNewProject />} />
        <Route path="/projects/invite/:inviteCode/:projectId" element={<Invite />} />

        {/* Admin Panel */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<Users />} />

        {/* Auth */}
        <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/register" element={<Register authenticated={authenticated} setAuthenticated={setAuthenticated} />} />
        <Route path="/logout" element={<Logout />} />

      </Routes>
    </Router>
  );
}

export default App;
