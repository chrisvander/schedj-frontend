import env from './env.js';

const server = 'http://129.161.37.197:8080';
// const server = 'http://localhost:8080';

export default {
	SERVER: server,
	ROUTES: {
		login: server + '/login',
		logout: server + '/logout',
		handshake: server + '/verify_status',
		address: server + '/address',
		registration: server + '/feed/registration?term=',
		holds: server + '/exists_hold',
		fetch: server + '/fetch?url='
	}
}