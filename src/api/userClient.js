import {callApi} from './common';

const userApi = "/um";

export function authenticate({email, password}) {
  return callApi({
    url: `${userApi}/non-secured/authenticate`,
    method: 'POST',
    body: { email, password },
  });
}

export function register({email, password}) {
  return callApi({
    url: `${userApi}/non-secured/register`,
    method: 'POST',
    body: { email, password },
  });
}

export function isLoggedIn() {
  return callApi({
    url: `${userApi}/api/authenticate`,
  });
}

export function logout() {
  return callApi({
    url: `${userApi}/api/logout`,
    method: 'POST',
  });
}
