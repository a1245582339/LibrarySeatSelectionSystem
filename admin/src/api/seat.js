import http from './index';
const domain  = '/api/seat';

export const getSeat = params => {
    return http.get(`${domain}`, {params})
}