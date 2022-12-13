import localforage from "localforage";

const saveStorage = async function (key, data) {
  if (data) {
    await localforage.setItem(key, JSON.stringify(data));
  }
};

const getStorage = async function (key, item) {
  const data = await localforage.getItem(key);
  if (data && item) {
    return JSON.parse(data)[item];
  } else if (data) {
    return JSON.parse(data);
  }
};

const clearStorage = async function (key = false) {
  if (key) {
    await localforage.removeItem(key);
  } else {
    await localforage.clear();
  }
};

export { getStorage, saveStorage, clearStorage };
