import http from './index';
const domain  = '/api/seat';

export const getSeat = params => {
    return http.get(`${domain}`, {params})
}

export const updateSeat = (library_id, data) => {
    return http.post(`${domain}?library_id=${library_id}`, {data})
}