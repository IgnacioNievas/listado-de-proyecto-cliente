import React, { useContext, useEffect } from 'react';
import {
	FaPencilAlt,
	FaTrashAlt,
	FaCheckSquare,
	FaRegCheckSquare,
} from 'react-icons/fa';

import TaskContext from '../../context/task/TaskContext';
import { success, confir } from '../alerts/alerts';

const Task = ({ tarea }) => {
	const {
		guardarTask,
		editarTask,
		stateEliminar,
		mostrarTask,
		eliminarTask,
		mensaje,
	} = useContext(TaskContext);

	const { nombre, completado, _id, proyecto } = tarea;

	useEffect(() => {
		if (mensaje) {
			success(mensaje);
		}
	}, [mensaje]);

	const borrarTarea = async () => {
		const resp = await confir(nombre);

		if (resp.value) {
			eliminarTask(_id, proyecto);
		}
	};

	const guardarTarea = () => {
		guardarTask(tarea);
	};

	const cambioEstado = () => {
		if (completado) {
			tarea.completado = false;
		} else {
			tarea.completado = true;
		}
		mostrarTask(proyecto);
		editarTask(tarea);
	};

	return (
		<li className='tarea sombra'>
			<p>{nombre}</p>
			<div className='estado'>
				{completado ? (
					<button onClick={cambioEstado} type='button'>
						<FaCheckSquare />
					</button>
				) : (
					<button onClick={cambioEstado} type='button'>
						<FaRegCheckSquare />
					</button>
				)}
			</div>
			<div className='acciones'>
				<button
					onClick={guardarTarea}
					type='button'
					className='btn btn-primario'>
					<FaPencilAlt />
				</button>
				<button
					onClick={borrarTarea}
					type='button'
					className='btn btn-secundario'
					disabled={stateEliminar}>
					<FaTrashAlt />
				</button>
			</div>
		</li>
	);
};

export default Task;
