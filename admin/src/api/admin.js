import http from './index';
const domin = '/api/admin';

export const getAdminList = params => {
    return http.get(`${domin}`, {params})
}

export const updateAdmin = (id, data) => {
    return http.post(`${domin}?id=${id}`, {data})
}

export const createAdmin = data => {
    return http.post(`${domin}`, {data})
}