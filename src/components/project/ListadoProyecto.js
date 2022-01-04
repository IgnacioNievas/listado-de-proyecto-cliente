import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/project/ProyectoContext';
import AuthContext from '../../context/auth/AuthContext';
import { err } from '../alerts/alerts';
import { Spinner2 } from '../spinner/Spinner';

const ListadoProyecto = () => {
	const {
		proyectos,
		proyectos2,
		mensaje,
		loading,
		obtenerProyectos,
		restaurarProyecto,
		obtenerProyectosFalse,
	} = useContext(ProyectoContext);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (mensaje) {
			err(mensaje);
		}
		obtenerProyectos();
		obtenerProyectosFalse(user._id);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensaje, user._id]);

	const restaurar = () => {
		restaurarProyecto(proyectos2);
	};
	// debugger;
	return proyectos.length === 0 && loading ? (
		<Spinner2 />
	) : proyectos.length > 0 ? (
		<TransitionGroup>
			{proyectos.map((proyecto, i) => (
				<CSSTransition key={i} timeout={200} classNames='proyecto'>
					<ul className='listado-proyectos'>
						<Proyecto proyecto={proyecto} />
					</ul>
				</CSSTransition>
			))}
		</TransitionGroup>
	) : proyectos2.length > 0 ? (
		<button className='btn btn-primario' onClick={restaurar}>
			Restaurar todos los proyectos eliminados
		</button>
	) : (
		<p> No hay proyectos,comience agregando uno por favor</p>
	);
};

export default ListadoProyecto;
