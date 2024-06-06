let LocalStorage: Storage;

if (typeof window === 'undefined') {
  const LocalStorageNode = require('node-localstorage').LocalStorage;
  LocalStorage = new LocalStorageNode('./scratch');
} else {
  LocalStorage = localStorage;
}

export const setLocalStorage = (key: string, value: string) => {
    LocalStorage.setItem(key, value);
}

export const getLocalStorage = (key: string) => {
    return LocalStorage.getItem(key);
}