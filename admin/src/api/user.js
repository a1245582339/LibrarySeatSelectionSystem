import http from './index';
const domin  = '/admin';

export const login = user => {
    return http.post(`${domin}/login`, user)
}

export const getUserInfo = token => {
    return http.get(`${domin}/userInfo?token=${token}`)
}

export const createUser = data => {
    return http.post(`${domin}/userInfo`, data)
}

export const updateUserInfo = data => {
    return http.post(`${domin}/userInfo`, data)
}


export const checkPassword = info => {
    return http.get(`${domin}/checkPassword`, {params: info})
}