import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Dashboard Component
const Dashboard = () => {
    const location = useLocation(); // Access location object to get state
    const { email } = location.state || {}; // Destructure email from the state
    return (
        <div style={{ padding: '20px' }}>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ display: 'inline', marginRight: '10px' }}>
                        <NavLink
                            to="/"
                            style={{ textDecoration: 'none' }}
                            activeStyle={{ fontWeight: 'bold' }}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li style={{ display: 'inline', marginRight: '10px' }}>
                        <NavLink
                            to="/about"
                            style={{ textDecoration: 'none' }}
                            activeStyle={{ fontWeight: 'bold' }}
                        >
                            About
                        </NavLink>
                    </li>
                    <li style={{ display: 'inline', marginRight: '10px' }}>
                        <NavLink
                            to="/"
                            style={{ textDecoration: 'none' }}
                            activeStyle={{ fontWeight: 'bold' }}
                        >
                            Sign Out
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* User Email */}
            <div>
                <h2>Welcome, {email}</h2>
            </div>
        </div>
    );
};

export default Dashboard;
