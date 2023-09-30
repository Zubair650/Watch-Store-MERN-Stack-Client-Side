// import React, { useContext } from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';


const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    // if(loading)
    // {
    //     return 'loading...'
    // }
    if(user)
    {
        return children;
    }
    return (
        <Navigate to="/Login" state={{from: location}} replace></Navigate>
    );
};

export default PrivateRoutes;