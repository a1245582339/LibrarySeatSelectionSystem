import http from './index';
const domain  = '/api/admin';

export const login = user => {
    return http.post(`${domain}/login`, user)
}

export const getUserInfo = token => {
    return http.get(`${domain}/info`)
}

export const updateUserInfo = data => {
    return http.post(`${domain}/userInfo`, data)
}


export const checkPassword = params => {
    return http.get(`${domain}/password`, {params})
}