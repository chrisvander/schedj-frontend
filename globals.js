import env from './env.js';

const server = 'http://' + env.server.server_ip + ':' + env.server.port;

export default {
	SERVER: server,
	ROUTES: {
		login: server + '/login',
		logout: server + '/logout',
		handshake: server + '/verify_status',
		address: server + '/address',
		registration: server + '/feed/registration?term=',
		holds: server + '/exists_hold',
		fetch: server + '/fetch?url=',
		schedule_weekly: server + '/schedule',
		class_info: server + '/class_info?crn='
	},
	SCHEDULE: {
		loaded: false,
	}
}
