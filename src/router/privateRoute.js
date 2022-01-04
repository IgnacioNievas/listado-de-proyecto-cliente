import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Spinner } from '../components/spinner/Spinner';
import AuthContext from '../context/auth/AuthContext';

export const Privateroute = ({ ...rest }) => {
	const { token, authenticate, loading, authUser } = useContext(AuthContext);

	useEffect(() => {
		authUser();
		// eslint-disable-next-line
	}, []);

	return loading ? (
		<Spinner />
	) : token && authenticate ? (
		<Route {...rest} />
	) : (
		<Redirect to={'/'} />
	);
};

export const Privateroute2 = ({ ...rest }) => {
	const { token, loading, authenticate, authUser, cerrarSesion } =
		useContext(AuthContext);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			authUser();
		} else {
			cerrarSesion();
		}
		// eslint-disable-next-line
	}, []);
	return loading ? (
		<Spinner />
	) : token && authenticate ? (
		<Redirect to={'/proyectos'} />
	) : (
		<Route {...rest} />
	);
};
