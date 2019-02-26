import http from './config'
const domain = '/api/student'

export const login = (data) => {
    return http.post(`${domain}/login`, data)
}

export const stuInfo = () => {
    return http.get(`${domain}/info`)
}

export const checkPassword = (params) => {
    return http.get(`${domain}/password`, { params })
}

export const updateStu = (data) => {
    return http.post(`${domain}`, { data })
}