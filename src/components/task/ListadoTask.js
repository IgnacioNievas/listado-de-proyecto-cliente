import React, { useContext, useEffect, useRef } from 'react';
import { FaRegTrashAlt, FaPencilAlt } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ProyectoContext from '../../context/project/ProyectoContext';
import TaskContext from '../../context/task/TaskContext';
import { success, confir } from '../alerts/alerts';
import Task from './Task';

const ListadoTask = () => {
	const inputEl = useRef(null);
	const {
		project,
		eliminaProyecto,
		seleccionaraEditarProyecto,
		stateEliminar,
		mensaje,
	} = useContext(ProyectoContext);
	const { tareasProject, tareasProjectFalse, restaurarTask } =
		useContext(TaskContext);

	useEffect(() => {
		if (mensaje) {
			success(mensaje);
		}
	}, [mensaje]);

	if (!tareasProject) return null;
	if (!project) return null;

	const { nombre, _id } = project[0];

	const elimina = async () => {
		const resp = await confir(nombre);
		if (resp.value) {
			eliminaProyecto(_id);
		}
	};

	const editarProyecto = () => {
		seleccionaraEditarProyecto();
	};

	const restaurar = () => {
		restaurarTask(tareasProjectFalse);
	};

	return (
		<div>
			<h2>Proyecto:{nombre} </h2>
			<ul className='listado-tareas'>
				{tareasProject.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas disponibles</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasProject.map((tarea, i) => (
							<CSSTransition
								key={i}
								timeout={200}
								classNames='tarea'
								nodeRef={inputEl}>
								<div ref={inputEl}>
									<Task tarea={tarea} />
								</div>
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>
			<div className='acciones'>
				<button
					type='button'
					onClick={editarProyecto}
					className='btn btn-primario'>
					Editar el nombre del proyecto <FaPencilAlt />
				</button>
				<button
					type='button'
					onClick={elimina}
					disabled={stateEliminar}
					className='btn btn-secundario'>
					Eliminar el proyecto <FaRegTrashAlt />
				</button>
				{tareasProject.length === 0 && tareasProjectFalse.length > 0 ? (
					<button
						type='button'
						onClick={restaurar}
						className='btn btn-secundario'>
						Restaurar todas tareas
					</button>
				) : null}
			</div>
		</div>
	);
};

export default ListadoTask;
