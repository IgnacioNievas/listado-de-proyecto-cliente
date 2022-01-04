import React, { useReducer, useContext } from 'react';
import clienteAxios from '../../config/axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import ProyectoContext from '../project/ProyectoContext';
import {
	LOGIN_EXISTOSO,
	LOGIN_ERROR,
	RESGISTRO_EXISTOSO,
	RESGISTRO_ERROR,
	OBTENER_USER,
	CERRAR_SESION,
	CAMBIO_URL,
} from '../../types';
import authToken from '../../config/authToken';

const AuthState = ({ children }) => {
	const { limpiarProyecto } = useContext(ProyectoContext);

	const initialState = {
		token: null,
		authenticate: null,
		user: null,
		mensaje: null,
		loading: true,
	};
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registrarUser = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/user', datos);

			dispatch({
				type: RESGISTRO_EXISTOSO,
				payload: respuesta?.data['access_token'],
			});
			authUser();
		} catch (error) {
			dispatch({
				type: RESGISTRO_ERROR,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const authUser = async () => {
		const token = localStorage.getItem('token');
		if (token) {
			authToken(token);
		}

		try {
			const respuesta = await clienteAxios.get('/api/auth');

			dispatch({
				type: OBTENER_USER,
				payload: respuesta?.data['user'],
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	const iniciarUser = async (datos) => {
		try {
			const respuesta = await clienteAxios.post('/api/auth', datos);

			dispatch({
				type: LOGIN_EXISTOSO,
				payload: respuesta?.data['access_token'],
			});
			authUser();
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const cerrarSesion = () => {
		limpiarProyecto();
		dispatch({
			type: CERRAR_SESION,
		});
	};

	const cambioUrl = () => {
		dispatch({
			type: CAMBIO_URL,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				authenticate: state.authenticate,
				user: state.user,
				mensaje: state.mensaje,
				loading: state.loading,
				registrarUser,
				iniciarUser,
				authUser,
				cerrarSesion,
				cambioUrl,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthState;
