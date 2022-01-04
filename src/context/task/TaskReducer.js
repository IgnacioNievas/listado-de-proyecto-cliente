import {
	TASK_PROYECTO,
	TASK_FALSE_PROYECTO,
	AGREGAR_TASK,
	ELIMINAR_TASK,
	EDITAR_TASK,
	GUARDAR_TASK,
	LIMPIAR_TASK,
	RESTAURAR_TASK,
	ERROR_TASK,
} from '../../types';

const TaskReducer = (state, action) => {
	switch (action.type) {
		case TASK_PROYECTO:
			return {
				...state,
				tareasProject: action.payload,
				mensaje: null,
			};
		case TASK_FALSE_PROYECTO:
			return {
				...state,
				tareasProjectFalse: action.payload,
			};
		case AGREGAR_TASK:
			return {
				...state,
				tareasProject: [action.payload, ...state.tareasProject],
				mensaje: null,
			};

		case ELIMINAR_TASK:
			return {
				...state,
				tareasProject: state.tareasProject.filter(
					(task) => task._id !== action.payload[1]
				),
				mensaje: action.payload[0],
			};
		case EDITAR_TASK:
			return {
				...state,
				tareasProject: state.tareasProject.map((task) =>
					task._id === action.payload._id ? action.payload : task
				),
				tareasProjectFalse: state.tareasProjectFalse.map((task) =>
					task._id === action.payload._id ? action.payload : task
				),
				stateEliminar: false,
			};

		case GUARDAR_TASK:
			return {
				...state,
				tareaActual: action.payload,
				stateEliminar: true,
			};
		case LIMPIAR_TASK:
			return {
				...state,
				tareaActual: null,
			};

		case RESTAURAR_TASK:
			return {
				...state,
				tareasProject: action.payload,
				mensaje: null,
			};
		case ERROR_TASK:
			return {
				...state,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};

export default TaskReducer;
