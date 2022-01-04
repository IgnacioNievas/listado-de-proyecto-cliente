import React, { useState, useContext, useEffect } from 'react';
import ProyectoContext from '../../context/project/ProyectoContext';
import { err, question } from '../alerts/alerts';

const NuevoProyecto = () => {
	const {
		mostrarFormulurio,
		agregarProyecto,
		projectActual,
		editarProyecto,
		project,
		formulario,
	} = useContext(ProyectoContext);

	const [proyecto, setProyecto] = useState({ nombre: '' });

	const { nombre } = proyecto;

	useEffect(() => {
		if (projectActual !== null) {
			setProyecto(project[0]);
		}
	}, [projectActual, project]);

	const nombreProyecto = (e) => {
		setProyecto({ ...proyecto, [e.target.name]: e.target.value });
	};

	const submitProyect = (e) => {
		e.preventDefault();

		if (!nombre.trim()) {
			err('no se puede mandar un proyecto vacio');
			return;
		}

		//agregar nuevos proyecto al state
		if (projectActual) {
			editarProyecto(proyecto);
		} else {
			agregarProyecto(proyecto);
		}
		//reiniciar el form
		setProyecto({ nombre: '' });
	};

	const mostrarForm = async () => {
		const resp = await question();

		if (resp.value) {
			mostrarFormulurio();
		}
	};

	return (
		<div>
			<button
				onClick={mostrarForm}
				type='button'
				className='btn btn-primario btn-block'>
				{projectActual ? 'Editando Proyecto' : 'Nuevo Proyecto'}
			</button>
			{formulario ? (
				<form onSubmit={submitProyect} className='formulario-nuevo-proyecto'>
					<input
						type='text'
						placeholder='nombre del proyecto'
						name='nombre'
						className='input-text'
						value={nombre}
						onChange={nombreProyecto}
					/>
					<button type='submit' className='btn btn-primario btn-block'>
						{projectActual ? 'Editar Proyecto' : 'Agregar Proyecto'}
					</button>
				</form>
			) : null}
		</div>
	);
};

export default NuevoProyecto;
