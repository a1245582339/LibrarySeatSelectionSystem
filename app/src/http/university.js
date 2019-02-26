import http from './config'
const domain = '/api/library'

export const getUniversity = (params) => {
    return http.get(`${domain}`, {params})
}