import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { err } from '../alerts/alerts';

const Login = () => {
	const [usuario, setUsuario] = useState({
		email: '',
		password: '',
	});

	const { iniciarUser, mensaje, cambioUrl } = useContext(AuthContext);

	useEffect(() => {
		if (mensaje) {
			err(mensaje);
		}
	}, [mensaje]);

	const { email, password } = usuario;

	const getUser = (e) => {
		setUsuario({ ...usuario, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			err('todos los campos son obligatorios');

			return;
		}
		iniciarUser(usuario);
		setUsuario({ email: '', password: '' });
	};

	return (
		<div className='form-usuario'>
			<div className='contenedor-form sombra-dark'>
				<form onSubmit={submit}>
					<h1>Iniciar Sesión</h1>
					<div className='campo-form'>
						<label htmlFor='email'>*Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Escriba su Email'
							onChange={getUser}
							value={email}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>*Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Escriba su Password'
							onChange={getUser}
							value={password}
						/>
					</div>
					<div className='campo-form'>
						<button type='submit' className='btn btn-primario btn-block'>
							Iniciar Sesión
						</button>
					</div>
				</form>
				<Link to={'/nueva-cuenta'} className='enlace-cuenta'>
					<button onClick={cambioUrl} className='btn btn-blank '>
						Obtener cuenta
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Login;
