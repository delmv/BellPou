import React, { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import { Navigation, PrivateRoute } from '../components';
const Login = React.lazy(()=> import('./Login'));
const Vendor = React.lazy(()=> import('./Vendors'));
const Home = React.lazy(()=> import('./Home'));
const Rewards = React.lazy(()=> import('./Rewards'));
const Trashs = React.lazy(()=> import('./Trashs'));
const Users = React.lazy(()=> import('./Users'));
const PageNotFound = React.lazy(()=> import('./PageNotFound'));
const Logout = React.lazy(()=> import('./Logout'));

export default function Layout() {
	return (
		<Router>
			<Navigation />
			<Suspense fallback={<div>Chargement...</div>}>
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
			</Suspense>
		</Router >
	);
}
