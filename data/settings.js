import { AsyncStorage } from 'react-native';

const settingsBundle = '@app:settings';

export function set(obj) {
  return AsyncStorage.setItem(settingsBundle, JSON.stringify(obj));
}

export async function get() {
  const bundle = await AsyncStorage.getItem(settingsBundle);
  if (bundle) return JSON.parse(bundle);
  set({});
  return {};
}
