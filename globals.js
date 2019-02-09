const server = 'http://129.161.211.110:8080';
// const server = 'http://localhost:8080';

export default {
	USES_BIOMETRICS: 'false',
	SERVER: server,
	ROUTES: {
		login: server + '/login'
	}
}