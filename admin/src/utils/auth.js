import cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return cookies.get(TokenKey);
}

export function setToken(token) {
  return cookies.set(TokenKey, token);
}

export function removeToken() {
  return cookies.remove(TokenKey);
}
