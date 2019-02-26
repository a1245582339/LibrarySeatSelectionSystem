import http from './config'

const domain = '/api/seat'

export const getLibSeat = (params) => {
    return http.get(`${domain}`, {params})
}
