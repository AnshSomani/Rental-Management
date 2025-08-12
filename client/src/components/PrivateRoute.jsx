import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useApp } from '../context/AppContext'; // This will be used later

const PrivateRoute = ({ roles }) => {
    // const { user } = useApp(); // This will be replaced by context
    const user = { name: 'Adam', role: 'customer' }; // Placeholder for now

    if (!user) {
        // Not logged in, redirect to login page, saving the location they were trying to go to
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Logged in but does not have the required role, redirect to home page
        return <Navigate to="/" replace />;
    }

    // Authorized, so render the child components (the actual page)
    return <Outlet />;
};

export default PrivateRoute;
