import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import { Navigation, PrivateRoute } from '../components';
import Login from './Login';
import Vendor from './Vendors';
import Home from './Home';
import Rewards from './Rewards';
import Trashs from './Trashs';
import Users from './Users';
import PageNotFound from './PageNotFound';
import Logout from './Logout';

export default function Layout() {
	return (
		<Router>
			<Navigation />
			<Routes>
				<Route element={<PrivateRoute />} >
					<Route path='/' exact element={<Home />} />
					<Route path='/Vendors' element={<Vendor />} />
					<Route path='/Rewards' element={<Rewards />} />
					<Route path='/Trashs' element={<Trashs />} />
					<Route path='/Users' element={<Users />} />
					<Route path='/SignOut' element={<Logout />} />
				</Route>
				<Route path='/SignIn' element={<Login />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</Router >
	);
}
