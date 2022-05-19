export const getAuthToken = () => localStorage.getItem('ticketh-tkn');
export const getLs = key => localStorage.getItem(key);
export const setAuthToken = value => localStorage.setItem('ticketh-tkn', value);
export const setLs = (key, value) => localStorage.setItem(key, value);
