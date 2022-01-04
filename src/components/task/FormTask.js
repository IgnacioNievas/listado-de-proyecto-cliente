import React, { useState, useEffect, useContext } from 'react';
import ProyectoContext from '../../context/project/ProyectoContext';
import TaskContext from '../../context/task/TaskContext';
import { err } from '../alerts/alerts';

const FormTask = () => {
	const { agregarTareas, mostrarTask, tareaActual, editarTask, limpiarTask } =
		useContext(TaskContext);
	const [tarea, setTarea] = useState({ nombre: '' });

	useEffect(() => {
		if (tareaActual !== null) {
			setTarea(tareaActual);
		}
	}, [tareaActual]);

	const { nombre } = tarea;
	const { project } = useContext(ProyectoContext);

	if (!project) {
		return <h2 style={{ marginTop: '20px' }}>No hay Proyecto disponible</h2>;
	}

	const { _id } = project[0];

	const handleChange = (e) => {
		setTarea({ ...tarea, [e.target.name]: e.target.value });
	};

	const agregarNuevasTareas = (e) => {
		e.preventDefault();

		if (!nombre.trim()) {
			err('No puede ser una tarea vacia');
			return;
		}

		if (tareaActual) {
			editarTask(tarea);
			limpiarTask();
		} else {
			tarea.proyecto = _id;
			agregarTareas(tarea);
		}
		mostrarTask(_id);

		setTarea({ nombre: '' });
	};

	return (
		<div className='formulario'>
			<form onSubmit={agregarNuevasTareas}>
				<div className='contendor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre tareas...'
						name='nombre'
						onChange={handleChange}
						value={nombre}
					/>
				</div>
				<div className='contendor-input'>
					<button type='submit' className='btn btn-block btn-primario '>
						{tareaActual ? 'Editar Tarea' : 'Agregar Tarea'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormTask;
