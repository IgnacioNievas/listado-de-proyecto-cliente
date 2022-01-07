import React, { useReducer } from 'react';
import TaskReducer from './TaskReducer';
import TaskContext from './TaskContext';
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
import clienteAxios from '../../config/axios';

const TaskState = (props) => {
	const initialState = {
		tareasProject: [],
		tareasProjectFalse: [],
		tareaActual: null,
		stateEliminar: false,
		mensaje: null,
	};

	const [state, dispatch] = useReducer(TaskReducer, initialState);

	const mostrarTask = async (proyecto) => {
		try {
			const respuesta = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			});

			dispatch({
				type: TASK_PROYECTO,
				payload: respuesta.data.task,
			});
		} catch (error) {
			console.log(error.response.data);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const taskEliminadas = async (proyecto) => {
		try {
			const respuesta = await clienteAxios.get(`/api/tareas/${proyecto}`);

			dispatch({
				type: TASK_FALSE_PROYECTO,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const agregarTareas = async (tarea) => {
		try {
			const respuesta = await clienteAxios.post('/api/tareas', tarea);

			dispatch({
				type: AGREGAR_TASK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error.response.data);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const eliminarTask = async (id, proyecto) => {
		try {
			const respuesta = await clienteAxios.delete(
				`/api/tareas/${proyecto}/${id}`
			);

			const resultado = [respuesta.data, id];
			dispatch({
				type: ELIMINAR_TASK,
				payload: resultado,
			});
		} catch (error) {
			console.log(error.response.data);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const editarTask = async (tarea) => {
		try {
			const respuesta = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea
			);

			dispatch({
				type: EDITAR_TASK,
				payload: respuesta.data,
			});
		} catch (error) {
			console.log(error.response.data);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};

	const guardarTask = (tarea) => {
		dispatch({
			type: GUARDAR_TASK,
			payload: tarea,
		});
	};

	const restaurarTask = async (tareasEliminadas) => {
		try {
			tareasEliminadas.map(async (tareas) => {
				return await clienteAxios.put(`/api/tareas/${tareas._id}`, tareas);
			});

			dispatch({
				type: RESTAURAR_TASK,
				payload: tareasEliminadas,
			});
		} catch (error) {
			console.log(error.response.data[0]);
			dispatch({
				type: ERROR_TASK,
				payload: error.response?.data?.errors[0]?.msg,
			});
		}
	};
	const limpiarTask = () => {
		dispatch({
			type: LIMPIAR_TASK,
		});
	};

	return (
		<TaskContext.Provider
			value={{
				tareasProject: state.tareasProject,
				tareasProjectFalse: state.tareasProjectFalse,
				tareaActual: state.tareaActual,
				stateEliminar: state.stateEliminar,
				mensaje: state.mensaje,
				mostrarTask,
				agregarTareas,
				eliminarTask,
				editarTask,
				guardarTask,
				restaurarTask,
				limpiarTask,
				taskEliminadas,
			}}>
			{props.children}
		</TaskContext.Provider>
	);
};

export default TaskState;
