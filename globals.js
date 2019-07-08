import env from './env';

const server = env.server.local
  ? `http://localhost:${env.server.port}`
  : `http://${env.server.server_ip}:${env.server.port}`;

export default {
  SERVER: server,
  ROUTES: {
    login: `${server}/login`,
    logout: `${server}/logout`,
    handshake: `${server}/verify_status`,
    address: `${server}/address`,
    registration: `${server}/feed/registration?term=`,
    holds: `${server}/exists_hold`,
    fetch: `${server}/fetch?url=`,
    schedule_weekly: `${server}/schedule_mock`,
    class_info: `${server}/class_info?crn=`,
    grades: `${server}/grades`,
  },
  SCHEDULE: {
    loaded: false,
  },
  GRADES: {},
  HOLDS: false,
};
