import React, { useContext } from 'react';
import ProyectoContext from '../../context/project/ProyectoContext';
import TaskContext from '../../context/task/TaskContext';
const Proyecto = ({ proyecto }) => {
	const { nombre, _id } = proyecto;
	const { seleccionaProyecto } = useContext(ProyectoContext);
	const { mostrarTask, taskEliminadas } = useContext(TaskContext);

	const seleccionarProject = () => {
		seleccionaProyecto(_id);
		mostrarTask(_id);
		taskEliminadas(_id);
	};
	return (
		<li>
			<button onClick={seleccionarProject} className='btn btn-blank'>
				{nombre}
			</button>
		</li>
	);
};

export default Proyecto;
