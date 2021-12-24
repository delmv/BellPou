import React from 'react';

import SignOut from '../components/SignOut';

const logout = () => {
	sessionStorage.removeItem('token');
};

export default function Logout() {
	return (
		<SignOut logout={logout} redirection='/SignIn' />
	);
}