import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTask from '../task/FormTask';
import ListadoTask from '../task/ListadoTask';

const Proyectos = () => {
	const { authUser } = useContext(AuthContext);
	useEffect(() => {
		authUser();

		// eslint-disable-next-line
	}, []);

	return (
		<div className='contenedor-app'>
			<Sidebar />

			<div className='seccion-principal'>
				<Barra />
				<main>
					<FormTask />
					<div className='contenedor-tareas'>
						<ListadoTask />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Proyectos;
