import { AsyncStorage } from "react-native";
import { SecureStore } from "expo";
import globals from "../globals.js";

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
    else reject(false);
  });
};

export const signIn = (user, pass) => new Promise((resolve,reject) => {
  const url = globals.ROUTES.login + 
    `?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
  fetch(url, {
    method: 'POST',
  }).then(async (body) => {
    try {
      var data = JSON.parse(body._bodyInit);
    }
    catch (err) {
      reject("No response from server");
    }
          console.log(user);
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