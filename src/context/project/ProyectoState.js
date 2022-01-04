import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import ProyectoReducer from './ProyectoReducer';
import ProyectoContext from './ProyectoContext';

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

const ProyectoState = (props) => {
	const initialState = {
		proyectos: [],
		proyectos2: [],
		formulario: false,
		project: null,
		projectActual: null,
		stateEliminar: false,
		mensaje: null,
		loading: true,
	};

	const [state, dispatch] = useReducer(ProyectoReducer, initialState);

	const mostrarFormulurio = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	const obtenerProyectos = async () => {
		try {
			const resultado = await clienteAxios.get('/api/proyectos');

			dispatch({
				type: OBTENER_PROYECTOS,
				payload: resultado?.data['proyecto'],
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const obtenerProyectosFalse = async (creador) => {
		try {
			const resultado = await clienteAxios.get(`/api/proyectos/${creador}`);

			dispatch({
				type: OBTENER_PROYECTOS_FALSE,
				payload: resultado?.data['proyecto'],
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await clienteAxios.post('/api/proyectos', proyecto);

			dispatch({
				type: AGREGAR_PROYECTO,
				payload: resultado?.data,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const seleccionaProyecto = (project_id) => {
		dispatch({
			type: SELECCIONA_PROYECTO,
			payload: project_id,
		});
	};

	const eliminaProyecto = async (project_id) => {
		try {
			const resultado = await clienteAxios.delete(
				`/api/proyectos/${project_id}`
			);

			const respuesta = [project_id, resultado.data];
			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: respuesta,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const restaurarProyecto = async (proyecto) => {
		try {
			proyecto.map(async (proyect) => {
				await clienteAxios.put(`/api/proyectos/${proyect._id}`, proyect);
			});

			dispatch({
				type: RESTAURAR_PROYECTO,
				payload: proyecto,
			});
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const editarProyecto = async (proyecto) => {
		try {
			const resultado = await clienteAxios.put(
				`/api/proyectos/${proyecto._id}`,
				proyecto
			);

			dispatch({
				type: EDITAR_PROYECTO,
				payload: proyecto,
			});

			guardarProyecto([resultado.data]);
		} catch (err) {
			console.log(err.response);
			dispatch({
				type: ERROR_PROYECTO,
				payload: err.response.data.errors[0].msg,
			});
		}
	};

	const guardarProyecto = (proyecto) => {
		dispatch({
			type: GUARDAR_PROYECTO,
			payload: proyecto,
		});
	};
	const limpiarProyecto = () => {
		dispatch({
			type: LIMPIAR_PROYECTO,
		});
	};
	const seleccionaraEditarProyecto = () => {
		dispatch({
			type: SELECCIONARAEDITAR_PROYECTO,
		});
	};

	return (
		<ProyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				proyectos2: state.proyectos2,
				formulario: state.formulario,
				project: state.project,
				mensaje: state.mensaje,
				projectActual: state.projectActual,
				stateEliminar: state.stateEliminar,
				loading: state.loading,
				mostrarFormulurio,
				obtenerProyectos,
				agregarProyecto,
				seleccionaProyecto,
				seleccionaraEditarProyecto,
				eliminaProyecto,
				editarProyecto,
				guardarProyecto,
				obtenerProyectosFalse,
				restaurarProyecto,
				limpiarProyecto,
			}}>
			{props.children}
		</ProyectoContext.Provider>
	);
};

export default ProyectoState;
