import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { err } from '../alerts/alerts';

const NuevaCuenta = (props) => {
	const [user, setUser] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
	});

	const { nombre, email, password, confirmar } = user;
	const { registrarUser, mensaje, token, authenticate, cambioUrl } =
		useContext(AuthContext);
	useEffect(() => {
		if (mensaje) {
			err(mensaje);
		}
	}, [mensaje, token, authenticate, props.history]);

	const getUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault();

		if (
			!nombre.trim() ||
			!email.trim() ||
			!password.trim() ||
			!confirmar.trim()
		) {
			err('todos los campos son obligatorios');
			return;
		}

		if (
			nombre.length > 30 ||
			email.length > 30 ||
			password.length > 30 ||
			confirmar.length > 30
		) {
			err('no pueden ser mayor a 30 caracteres');

			return;
		}

		if (password.length < 6) {
			err('La contraseña debera ser mayor a 6 caracteres');
			return;
		}

		if (password !== confirmar) {
			err('Tienen que ser iguales las contraseñas');
			return;
		}

		registrarUser({ nombre, email, password });
	};

	return (
		<div className='form-usuario'>
			<div className='contenedor-form sombra-dark'>
				<form onSubmit={submit}>
					<h1>Crear nueva cuenta: </h1>
					<div className='campo-form'>
						<label htmlFor='nombre'>*Ingrese su nombre</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Escriba su nombre'
							onChange={getUser}
							value={nombre}
						/>
					</div>
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
						<label htmlFor='password'>*Contraseña</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Escriba su Contraseña'
							onChange={getUser}
							value={password}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='confirmar'>*Verificación de contraseña</label>
						<input
							type='password'
							id='confirmar'
							name='confirmar'
							placeholder='Escriba de nuevo su Contraseña'
							onChange={getUser}
							value={confirmar}
						/>
					</div>
					<div className='campo-form'>
						<button type='submit' className='btn btn-primario btn-block'>
							Crear cuenta
						</button>
					</div>
				</form>
				<Link to={'/'} className='enlace-cuenta'>
					<button onClick={cambioUrl} className='btn btn-blank '>
						Volver a Iniciar Sesión
					</button>
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
