import http from './index';
const domin  = '/room';

export const getRoom = () => {
    return http.get(`${domin}`,{params: {
        
    }})
}