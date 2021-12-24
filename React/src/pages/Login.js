import React from 'react';
import SignIn from '../components/SignIn';
import { login } from '../services/api';

export default function Login() {
	return (
		<SignIn login={login} redirection='/' />
	);
}