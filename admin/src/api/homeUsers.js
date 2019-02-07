import http from './index';
const domin  = '/user';


export const getHomeUsers = query => {
    return http.get(`/userList`, {params: query})
}

export const delUser = id => {
    return http.post(`${domin}/userInfo`, {id: id, isDel: 1})
}

export const checkUser = id => {
    return http.post(`${domin}/userInfo`, {id: id, role: 1})
}

export const userToOwner = data => {
    console.log(data)
    return http.post(`${domin}/userToOwner`, {id: data.id, room_id: data.room_id})
}

export const updateUser = data => {
    console.log(data)
    return http.post(`${domin}/userInfo`, data)
}
