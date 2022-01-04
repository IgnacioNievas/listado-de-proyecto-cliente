import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from '../components/auth/Login';
import NuevaCuenta from '../components/auth/NuevaCuenta';
import Proyectos from '../components/project/Proyectos';
import ProyectoState from '../context/project/ProyectoState';
import TaskState from '../context/task/TaskState';
import AuthState from '../context/auth/AuthState';

import { Privateroute, Privateroute2 } from './privateRoute';

const Routers = () => {
	return (
		<ProyectoState>
			<TaskState>
				<AuthState>
					<Router>
						<Switch>
							<Privateroute2 exact path='/' component={Login} />
							<Privateroute2
								exact
								path='/nueva-cuenta'
								component={NuevaCuenta}
							/>
							<Privateroute exact path='/proyectos' component={Proyectos} />
						</Switch>
					</Router>
				</AuthState>
			</TaskState>
		</ProyectoState>
	);
};

export default Routers;
