import http from './index';
const domin  = '/order';

export const getOrder = query => {
    return http.get(`${domin}`, {params: query})
}

export const updateOrder = data => {
    return http.post(`${domin}`, data)
}