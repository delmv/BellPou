import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
	if (sessionStorage.getItem('token') == null || sessionStorage.getItem('status') != 'manager'){
		return <Navigate to='/SignIn' />;
	}
	return <Outlet />;
}
