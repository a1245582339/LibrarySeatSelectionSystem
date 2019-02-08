import http from './index';
const domain  = '/api/admin';

export const login = user => {
    return http.post(`${domain}/login`, user)
}

export const getUserInfo = token => {
    return http.get(`${domain}/info`)
}

export const createUser = data => {
    return http.post(`${domain}/userInfo`, data)
}

export const updateUserInfo = data => {
    return http.post(`${domain}/userInfo`, data)
}


export const checkPassword = info => {
    return http.get(`${domain}/checkPassword`, {params: info})
}