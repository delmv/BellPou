import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useSnackbar} from 'notistack';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='localhost3000.com/'>
                BellPou
			</Link>{' '}
			{new Date().getFullYear()}
			.
		</Typography>
	);
}

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const theme = createTheme();

export default function SignIn(props) {
	const [error, setError] = React.useState(false);
	const [user, setUser] = React.useState(null);
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get('email');
		const password = data.get('password');
		if (email && password) {
			try {
				setUser(await props.login(email, password));
			} catch (e) {
				console.log(e.message);
				setError(e.message);
			}
		} else {
			enqueueSnackbar('L\'email et le mot de passe sont obligatoires', {variant: 'error'});
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setError(false);
	};


	return (
		<ThemeProvider theme={theme}>
			{user && (
				<Navigate to={props.redirection} replace={true} />
			)}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
                        Sign in
					</Typography>
					<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
                            Sign In
						</Button>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
			<Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
}