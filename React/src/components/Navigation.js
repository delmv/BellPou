import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const routes = [
	{ label: 'Home', path: '/' },
	{ label: 'Trashs', path: '/Trashs' },
	{ label: 'Vendors', path: '/Vendors' },
	{ label: 'Rewards', path: '/Rewards' },
	{ label: 'Users', path: '/Users' },
	{ label: 'SignOut', path: '/SignOut' },
];

export function Navigation() {
	const [value, setValue] = useState(0);
	const location = useLocation();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		const path = location.pathname;
		const index = routes.findIndex(route => route.path === path);
		if (index !== -1) handleChange(null, index);
	}, [location]);

	return (
		<Box sx={{ width: '100%' }}>
			<Tabs value={value} onChange={handleChange} aria-label='nav tabs'>
				{routes.map(route =>
					<Tab key={route.path} label={route.label} to={route.path} component={Link} />
				)}
			</Tabs>
		</Box>
	);
}
