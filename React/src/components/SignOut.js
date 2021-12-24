import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, Link, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='localhost3000.com/'>
                BellPou
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignOut({logout, redirection}) {
	const [isLogedOut,setIsLogedOut]= React.useState(false);
	const handleClick = async (event) => {
		event.preventDefault();
		logout();
		setIsLogedOut(true);
        
	};

	return (
		<ThemeProvider theme={theme}>
			{isLogedOut && (
				<Navigate to={redirection} replace={true} />
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
                        Sign Out
					</Typography>
					<Button
						type='submit'
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
						onClick={handleClick}
					>
                        Se déconnecter
					</Button>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}