import http from './index';
const domain  = '/api/university';

export const getUniversity = params => {
    return http.get(`${domain}`, {params})
}

export const updateUniversity = (id, data) => {
    return http.post(`${domain}?id=${id}`, {data})
}

