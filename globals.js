import env from './env.js';

const server = 'http://129.161.75.40:8080';
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