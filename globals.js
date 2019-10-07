import env from './env';

const port = `:${env.server.port}`;
const server = env.server.local
  ? `http${env.server.https ? 's' : ''}://localhost${port}`
  : `http${env.server.https ? 's' : ''}://${env.server.server_ip}${env.server.need_port ? port : ''}`;

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
    yacs: {
      terms: 'https://yacs.cs.rpi.edu/api/v6/terms',
      listings: 'https://yacs.cs.rpi.edu/api/v6/listings',
      schools: 'https://yacs.cs.rpi.edu/api/v6/schools',
    },
  },
  SCHEDULE: {
    loaded: false,
  },
  GRADES: {
    loaded: false,
  },
  SETTINGS: {
    loaded: false,
  },
  HOLDS: false,
};
