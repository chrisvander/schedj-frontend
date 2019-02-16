import env from './env.js';
const server = 'http://192.168.1.173:8080';
// const server = 'http://localhost:8080';

export default {
	SERVER: server,
	ROUTES: {
		login: server + '/login',
		logout: server + '/logout',
		handshake: server + '/verify_status',
		address: server + '/address',
		registration: server + '/feed/registration?term='
	}
}