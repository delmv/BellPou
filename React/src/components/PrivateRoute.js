import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
	if (sessionStorage.token === null || sessionStorage.token === undefined)
		return <Navigate to='/SignIn' />;
	return <Outlet />;
}
