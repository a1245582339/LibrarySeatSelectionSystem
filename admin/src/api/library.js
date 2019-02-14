import http from './index';
const domain  = '/api/library';

export const getLibrary = params => {
    return http.get(`${domain}`, {params})
}

export const createLibrary = ({data, seat}) => {
    return http.post(`${domain}`, {data, seat})
}