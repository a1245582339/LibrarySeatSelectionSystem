import http from './index';
const domin  = '/repair';

export const getRepair = query => {
    return http.get(`${domin}`, {params: query})
}

export const createRepair = data => {
    return http.post(`${domin}`, data)
}
export const changeRepair = data => {
    return http.put(`${domin}`, data)
}

export const uploadImage = file => {
    return http.post('/repairPhoto', file)
}