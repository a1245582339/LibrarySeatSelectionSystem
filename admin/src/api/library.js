import http from './index';
const domain  = '/api/library';

export const getLibrary = params => {
    return http.get(`${domain}`, {params})
}