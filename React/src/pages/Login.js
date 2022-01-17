import React from 'react';
import SignIn from '../components/SignIn';
import { login } from '../services/api';
import {useSnackbar} from 'notistack';

export default function Login() {
	const [user, setUser] = React.useState(null);
	const { enqueueSnackbar } = useSnackbar();

	function isEmailValid(email) {
		const regex = new RegExp('.+@.+\\..+');
		return regex.test(email);
	}

	const signIn = async (email, password) => {
		if (email && password && isEmailValid(email)) {
			try {
				setUser(await login(email, password));
				if(sessionStorage.getItem('status') != 'manager')
					throw new Error('You must be a manager');
				enqueueSnackbar('Login successful', {variant: 'success'});
			} catch (e) {
				enqueueSnackbar(e.message, {variant: 'error'});
			}
		} else {
			if (!isEmailValid(email))
				enqueueSnackbar('L\'email n\'est pas valide', {variant: 'error'});
			else
				enqueueSnackbar('L\'email et le mot de passe sont obligatoires', {variant: 'error'});
		}
	};
	return (
		<SignIn login={signIn} redirection='/' user={user}/>
	);
}