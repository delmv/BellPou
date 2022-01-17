import React from 'react';

import SignOut from '../components/SignOut';



export default function Logout() {
	const [isLogedOut,setIsLogedOut]= React.useState(false);

	const logout = () => {
		sessionStorage.removeItem('token');
		setIsLogedOut(true);
	};
	
	return (
		<SignOut logout={logout} redirection='/SignIn' isLogedOut={isLogedOut} />
	);
}