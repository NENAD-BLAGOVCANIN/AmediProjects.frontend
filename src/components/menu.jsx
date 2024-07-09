import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Menu = () => {
    const { role } = useAuth(); // Get the user role from the context

    if (!role) return null;

    switch (role) {
        case 'admin':
            return (
                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/projects">Projects</Link>
                </nav>
            );
        case 'project-manager':
            return (
                <nav>
                    <Link to="/projects">Projects</Link>
                    <Link to="/tasks">Tasks</Link>
                    <Link to="/team">Team</Link>
                </nav>
            );
        case 'ceo':
            return (
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/reports">Reports</Link>
                    <Link to="/strategy">Strategy</Link>
                </nav>
            );
        default:
            return (
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/notifications">Notifications</Link>
                </nav>
            );
    }
};

export default Menu;
