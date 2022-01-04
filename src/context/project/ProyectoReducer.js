import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	OBTENER_PROYECTOS_FALSE,
	AGREGAR_PROYECTO,
	SELECCIONA_PROYECTO,
	SELECCIONARAEDITAR_PROYECTO,
	ELIMINAR_PROYECTO,
	ERROR_PROYECTO,
	EDITAR_PROYECTO,
	GUARDAR_PROYECTO,
	RESTAURAR_PROYECTO,
	LIMPIAR_PROYECTO,
} from '../../types';

const ProyectoReducer = (state, action) => {
	switch (action.type) {
		case FORMULARIO_PROYECTO:
			return { ...state, formulario: true };

		case RESTAURAR_PROYECTO:
		case OBTENER_PROYECTOS:
			return {
				...state,
				proyectos: action.payload,
				mensaje: null,
				loading: false,
			};

		case OBTENER_PROYECTOS_FALSE:
			return {
				...state,
				proyectos2: action.payload,
				// loading: false,
			};

		case AGREGAR_PROYECTO:
			return {
				...state,
				proyectos: [action.payload, ...state.proyectos],
				formulario: false,
				mensaje: null,
			};

		case SELECCIONA_PROYECTO:
			return {
				...state,
				project: state.proyectos.filter(
					(project) => project._id === action.payload
				),
				mensaje: null,
			};

		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter(
					(project) => project._id !== action.payload[0]
				),
				mensaje: action.payload[1],
				project: null,
				loading: false,
			};

		case SELECCIONARAEDITAR_PROYECTO:
			return {
				...state,
				projectActual: true,
				stateEliminar: true,
				formulario: true,
			};
		case EDITAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.map((proyecto) =>
					proyecto._id === action.payload._id ? action.payload : proyecto
				),
				proyectos2: state.proyectos.map((proyecto) =>
					proyecto._id === action.payload._id ? action.payload : proyecto
				),
				formulario: false,
				projectActual: null,
				stateEliminar: false,
			};

		case GUARDAR_PROYECTO:
			return {
				...state,
				project: action.payload,
			};

		case ERROR_PROYECTO:
			return {
				...state,
				mensaje: action.payload,
			};
		case LIMPIAR_PROYECTO:
			return {
				...state,
				proyectos: [],
				proyectos2: [],
				project: null,
			};

		default:
			return state;
	}
};

export default ProyectoReducer;
