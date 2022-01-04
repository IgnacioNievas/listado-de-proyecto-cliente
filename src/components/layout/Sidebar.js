import React from 'react';
import ListadoProyecto from '../project/ListadoProyecto';
import NuevoProyecto from '../project/NuevoProyecto';

const Sidebar = () => {
	return (
		<aside>
			<h1>
				MERN<span>Tasks</span>
			</h1>

			<NuevoProyecto />
			<div className='proyectos'>
				<h2>Tus proyectos</h2>
				<ListadoProyecto />
			</div>
		</aside>
	);
};

export default Sidebar;
