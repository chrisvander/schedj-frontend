const server = 'http://localhost:8080';

export default {
	USES_BIOMETRICS: 'false',
	SERVER: server,
	ROUTES: {
		login: server + '/login'
	}
}