import http from './index';
const domin = '/adminList';

export const getAdminList = query => {
    return http.get(`${domin}`, {
        params: {
            ...query
        }
    })
}