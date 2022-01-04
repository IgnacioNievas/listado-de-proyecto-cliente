import {
	LOGIN_EXISTOSO,
	LOGIN_ERROR,
	RESGISTRO_EXISTOSO,
	RESGISTRO_ERROR,
	OBTENER_USER,
	CERRAR_SESION,
	CAMBIO_URL,
} from '../../types';

const AuthReducer = (state, action) => {
	switch (action.type) {
		case LOGIN_EXISTOSO:
		case RESGISTRO_EXISTOSO:
			localStorage.setItem('token', action.payload);
			return {
				...state,
				authenticate: true,
				mensaje: null,
				loading: false,
			};
		case RESGISTRO_ERROR:
		case LOGIN_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				authenticate: null,
				token: null,
				mensaje: action.payload,
				loading: false,
			};
		case CAMBIO_URL:
			return {
				...state,
				mensaje: null,
			};
		case OBTENER_USER:
			return {
				...state,
				token: localStorage.getItem('token'),
				authenticate: true,
				user: action.payload,
				loading: false,
			};
		case CERRAR_SESION:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				authenticate: null,
				loading: false,
			};
		default:
			return;
	}
};

export default AuthReducer;
