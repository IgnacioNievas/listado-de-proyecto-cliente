import Swal from 'sweetalert2';

export const err = (mjs) => {
	Swal.fire({
		titleText: `${mjs}`,
		icon: 'warning',
		timer: 2000,
		timerProgressBar: true,
		allowEnterKey: false,
		allowEscapeKey: false,
		allowOutsideClick: false,
		showConfirmButton: false,
	});
};

export const success = (mjs) => {
	Swal.fire({
		titleText: `${mjs}`,
		icon: 'success',
		timer: 2000,
		timerProgressBar: true,
		allowEnterKey: false,
		allowEscapeKey: false,
		allowOutsideClick: false,
		showConfirmButton: false,
	});
};

export const confir = (nombre) => {
	return Swal.fire({
		title: 'Estas seguro!! ',
		text: `que deseas eliminar ${nombre}?`,
		icon: 'question',
		confirmButtonText: 'Si , deseo eliminarla',
		confirmButtonColor: 'red',
		confirmButtonAriaLabel: 'Si , deseo eliminarla',
		cancelButtonText: 'No quiero eliminarla',
		cancelButtonColor: 'lime',
		cancelButtonAriaLabel: 'No quiero eliminarla',
		allowEscapeKey: false,
		allowOutsideClick: false,
		allowEnterKey: false,
		showCancelButton: true,
	});
};

export const question = () => {
	return Swal.fire({
		title: 'Estas seguro!! ',
		text: `que deseas agregar un nuevo proyecto?`,
		icon: 'question',
		confirmButtonText: 'Si , deseo  agregarlo',
		confirmButtonColor: '#00aae4',
		confirmButtonAriaLabel: 'Si , deseo  agregarlo',
		cancelButtonText: 'No deseo  agregarlo',
		cancelButtonColor: '#af7135',
		cancelButtonAriaLabel: 'No deseo  agregarlo',
		allowEscapeKey: false,
		allowOutsideClick: false,
		allowEnterKey: false,
		showCancelButton: true,
	});
};

export const questionLogOut = (nombre) => {
	return Swal.fire({
		title: 'Estas seguro!! ',
		text: `Que quiere cerrar la sesion ${nombre}?`,
		icon: 'question',
		confirmButtonText: 'Estoy de acuerdo',
		confirmButtonColor: 'lime',
		confirmButtonAriaLabel: 'Estoy de acuerdo ',
		cancelButtonText: 'No quiero cerrar sesion ',
		cancelButtonColor: '#6839ab',
		cancelButtonAriaLabel: 'No quiero cerrar sesion ',
		allowEscapeKey: false,
		allowOutsideClick: false,
		allowEnterKey: false,
		showCancelButton: true,
	});
};
