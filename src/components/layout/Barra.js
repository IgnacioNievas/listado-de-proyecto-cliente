import React, { useContext, useEffect } from 'react';
import { questionLogOut } from '../alerts/alerts';
import AuthContext from '../../context/auth/AuthContext';

const Barra = () => {
	const { user, authUser, cerrarSesion } = useContext(AuthContext);

	useEffect(() => {
		authUser();

		// eslint-disable-next-line
	}, []);

	const logOut = async () => {
		const resp = await questionLogOut(user.nombre);
		if (resp.value) {
			cerrarSesion();
		}
	};

	return (
		<header className='app-header'>
			{user ? (
				<p className='nombre-usuario'>
					Hola <span>{user['nombre']}</span>
				</p>
			) : null}

			<nav className='nav-principal'>
				<button onClick={logOut} className='btn btn-blank cerrar-sesion'>
					Cerrar Sesión
				</button>
			</nav>
		</header>
	);
};

export default Barra;
