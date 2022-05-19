import { getAuthToken } from './localStorage';
const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

const callAPI = async (method, url, data = {}) => {
  const token = getAuthToken();
  let headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const options = {
    method,
    headers,
  };
  if (method !== 'get') {
    options.body = JSON.stringify(data);
  }
  return fetch(server_url + url, options).then(res => res.json());
};

const callFormAPI = async (method, url, data) => {
  const token = getAuthToken();
  let headers;
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const options = {
    method,
    headers,
    body: data,
  };
  return fetch(server_url + url, options);
};

//---------------------AUTH API------------------------
export const emailLoginApi = data => callAPI('post', '/users/emailLogin', data);
export const verifyOtpApi = data => callAPI('post', '/users/verifyOtp', data);

export const checkAdminApi = () => callAPI('get', '/users/isAdmin');
export const logUserEmailApi = data => callAPI('post', '/log/userEmail', data);

//---------------------QR SCAN API----------------------
export const sendQrApi = data => callAPI('post', '/log/postQr', data);

//---------------------EVENTS API-----------------------
export const getAllEventsApi = () =>
  callAPI('get', '/event/allEvents?page=1&limit=10000');
export const getTicketsApi = id =>
  callAPI('get', `/event/getEvent?eventId=${id}`);
export const setTicketsApi = data => callAPI('put', '/event/setTickets', data);
//-----FORM API--------
export const createOfflineEventApi = data =>
  callFormAPI('post', '/event/createOfflineEvent', data);
export const createOnlineEventApi = data =>
  callFormAPI('post', '/event/createOnlineEvent', data);
//---------------------
