import * as SecureStore from 'expo-secure-store';
import { EventRegister } from 'react-native-event-listeners';
import globals from '../globals';
import getData from '../data/import_data';

function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

function timeout(ms, promise) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Did not find Schedj Backend service in time'));
    }, ms);
    promise.then(resolve, reject);
  }));
}

export const handshake = () => timeout(5000, new Promise((resolve, reject) => {
  fetch(globals.ROUTES.handshake)
    .then(res => res.json())
    .then(res => resolve(res.status === 'active'))
    .catch(() => reject(new Error('Did not find Schedj Backend service')));
}));

export const logout = () => {
  EventRegister.emit('begin_logout');
  return Promise.all([
    SecureStore.deleteItemAsync('username'),
    SecureStore.deleteItemAsync('password'),
    fetch(globals.ROUTES.logout),
  ]).then(() => EventRegister.emit('logout'));
};

export const signIn = (user, pass) => new Promise((resolve, reject) => {
  if (!(user && pass)) {
    reject(new Error('No username or password provided'));
    return;
  }
  const url = `${globals.ROUTES.login
  }?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
  handshake().then(() => {
    fetch(url, {
      method: 'POST',
      timeout: 20,
      credentials: 'same-origin',
    })
      .then(handleErrors)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Incorrect username or password.');
      })
      .then(async (body) => {
        const data = body;
        globals.TERM = data.term;
        globals.NAME = data.name.split('+');
        globals.SESSID = data.sessid;
        await SecureStore.setItemAsync('username', user);
        await SecureStore.setItemAsync('password', pass);
        try {
          await getData(data.term, () => {
            EventRegister.emit('begin_logout');
            fetch(globals.ROUTES.logout).then(() => {
              EventRegister.emit('logout');
            });
          });
        } catch (err) {
          reject(new Error('Gathering data from SIS failed'));
        }
        resolve(body);
      })
      .catch(() => {
        reject(new Error('Invalid response from SIS'));
      });
  }).catch((err) => {
    reject(err);
  });
});

export const isSignedIn = () => new Promise(async (resolve, reject) => {
  const user = await SecureStore.getItemAsync('username');
  const pass = await SecureStore.getItemAsync('password');
  if (user && pass) {
    signIn(user, pass)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  } else reject(new Error(null));
});
