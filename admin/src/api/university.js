import http from './index';
const domain  = '/api/university';

export const getUniversity = params => {
    return http.get(`${domain}`, {params})
}
