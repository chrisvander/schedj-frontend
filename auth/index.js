import { AsyncStorage } from "react-native";
import { SecureStore } from "expo";
import { EventRegister } from 'react-native-event-listeners';
import globals from "../globals.js";

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("Did not find Schedj Backend service in time"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const handshake = () => timeout(2000, new Promise((resolve,reject) => {
  fetch(globals.ROUTES.handshake)
  .then((res) => {
    resolve(JSON.parse(res._bodyInit).status==="active")
  })
  .catch((err) => {
    reject("Did not find Schedj Backend service");
  })
}));

export const logout = () => {
  SecureStore.deleteItemAsync("username");
  SecureStore.deleteItemAsync("password");
  EventRegister.emit('logout')
}

export const onSignIn = () => AsyncStorage.setItem(session, "true");

export const onSignOut = () => AsyncStorage.removeItem(session);

export const isSignedIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      var res = await handshake();
    }
    catch (err) {
      reject(err);
    }
    var user = await SecureStore.getItemAsync("username");
    var pass = await SecureStore.getItemAsync("password");
    if (user && pass) {
      signIn(user,pass)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err)
        resolve(false);
      });
    }
    else reject(null);
  });
};

export const signIn = (user, pass) => new Promise((resolve,reject) => {
  const url = globals.ROUTES.login + 
    `?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
  fetch(url, {
    method: 'POST',
    timeout: 20,
  }).then(async (body) => {
    try {
      var data = JSON.parse(body._bodyInit);
    }
    catch (err) {
      reject("No response from server");
    }
    globals.TERM = data.term;
    globals.NAME = data.name.split('+');
    globals.SESSID = data.sessid;
    await SecureStore.setItemAsync("username", user);
    await SecureStore.setItemAsync("password", pass);
    if (body.ok) resolve(body);
    else reject("Unauthorized");
  }).catch((err) => {
    reject(err);
  });
});