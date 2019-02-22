import http from './config'
const domain = '/api/student'

export const login = (data) => {
    return http.post(`${domain}/login`, data)
}

export const stuInfo = (params) => {
    return http.get(`${domain}/info`, { params })
}

export const checkPassword = (params) => {
    return http.get(`${domain}/password`, { params })
}

export const updateStu = (data) => {
    return http.post(`${domain}`, { data })
}