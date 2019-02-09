import { AsyncStorage } from "react-native";
import * as Keychain from "react-native-keychain";
import globals from "../globals.js";

export const session = "SESSID";

export const onSignIn = () => AsyncStorage.setItem(session, "true");

export const onSignOut = () => AsyncStorage.removeItem(session);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(session)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const signIn = (user, pass) => new Promise((resolve,reject) => {
  const url = globals.ROUTES.login + 
    `?user=${encodeURIComponent(user)}&pass=${encodeURIComponent(pass)}`;
  fetch(url, {
    method: 'POST',
  }).then((body) => {
    var data = JSON.parse(body._bodyInit);
    globals.TERM = data.term;
    globals.NAME = data.name.split('+');
    globals.SESSID = data.sessid;
    if (body.ok) resolve(body);
    else reject("Unauthorized");
  }).catch((err) => {
    reject(err);
  });
});