import { AsyncStorage } from "react-native";
import { SecureStore } from "expo";
import { EventRegister } from 'react-native-event-listeners';
import globals from "../globals.js";
import { getData } from '../data/import_data.js';

function handleErrors(response) {
    if (!response.ok) {
      console.log(response.statusText);
    }
    return response;
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject("Did not find Schedj Backend service in time")
    }, ms)
    promise.then(resolve, reject)
  })
}

export const handshake = () => timeout(5000, new Promise((resolve,reject) => {
  fetch(globals.ROUTES.handshake)
  .then((res) => {
    resolve(JSON.parse(res._bodyInit).status==="active")
  })
  .catch((err) => {
    reject("Did not find Schedj Backend service");
  })
}));

export const logout = () => {
  EventRegister.emit('begin_logout');
  Promise.all([
    SecureStore.deleteItemAsync("username"),
    SecureStore.deleteItemAsync("password"),
    fetch(globals.ROUTES.logout)
  ]).then(() => EventRegister.emit('logout'));
}

export const onSignIn = () => AsyncStorage.setItem(session, "true");

export const onSignOut = () => AsyncStorage.removeItem(session);

export const isSignedIn = () => {
  return new Promise(async (resolve, reject) => {
    var user = await SecureStore.getItemAsync("username");
    var pass = await SecureStore.getItemAsync("password");
    if (user && pass) {
      signIn(user,pass)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        resolve(false);
      });
    }
    else reject(null);
  });
};

export const signIn = (user, pass) => new Promise((resolve,reject) => {
  if (!(user && pass)) {
    reject("No username or password provided");
    return;
  }
  const url = globals.ROUTES.login + 
    `?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
  handshake().then(()=> {
    console.log("Handshake done");
    fetch(url, {
      method: 'POST',
      timeout: 20,
    })
    .then(handleErrors)
    .then(async (body) => {
      try {
        var data = JSON.parse(body._bodyInit);
      }
      catch (err) {
        reject("Username or password are incorrect");
      }
      globals["TERM"] = data.term;
      globals["NAME"] = data.name.split('+');
      globals["SESSID"] = data.sessid;
      await SecureStore.setItemAsync("username", user);
      await SecureStore.setItemAsync("password", pass);
      if (body.ok) {
        try {
          await getData(data.term);
        }
        catch (err) {
          reject("Gathering data from SIS failed");
        }
        resolve(body);
      }
      else reject("Unauthorized");
    }).catch((err) => {
      reject("Invalid response from SIS")
      console.log(err);
    });
  }).catch((err) => {
    reject("Failed to find Schedj Backend service", "Network Error");
  });
  return;
});