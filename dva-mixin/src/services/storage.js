let hash = {};
export function set(key, value) {
  hash[key] = value;
  if (typeof value === 'object') {
    const str = JSON.stringify(value);
    global.localStorage.setItem(key, str);
    document.cookie = `${key}=${str}`;
    return;
  }
  global.localStorage.setItem(key, value);
  document.cookie = `${key}=${value}`;
}
export function get(key) {
  if (hash[key]) {
    return hash[key];
  }
  const value = global.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (ex) {
    return value;
  }
}
export function remove(key) {
  delete hash[key];
  global.localStorage.removeItem(key);
}
export function clear(key) {
  hash = {};
  global.localStorage.clear(key);
}
export function cache() {
  return hash;
}
