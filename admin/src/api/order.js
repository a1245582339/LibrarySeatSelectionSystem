import http from './index';
const domin  = '/api/order';

export const getOrder = query => {
    return http.get(`${domin}`, {params: query})
}

export const updateOrder = (params, data) => {
    return http.post(`${domin}?id=${params.id}`, {data})
}