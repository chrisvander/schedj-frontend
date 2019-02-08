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
  fetch(globals.ROUTES.login, {
    method: 'POST'
  })
    .then((body) => {
      resolve(body);
    })
    .catch((err) => {
      reject(err);
    });
});