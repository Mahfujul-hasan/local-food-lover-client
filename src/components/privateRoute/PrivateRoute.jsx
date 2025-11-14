import React from 'react';
import useAuth from '../../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../Spinner';

const PrivateRoute = ({children}) => {
    const{user, loading}=useAuth();
    const location = useLocation();
    if(loading){
        return <Spinner/>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
   
};

export default PrivateRoute;